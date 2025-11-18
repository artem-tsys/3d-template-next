import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useActiveSvg } from "../../hooks/use-active-svg.ts";
import { useOverlayNavigation } from "../../hooks/use-overlay-navigation.ts";
import styles from './svg-overlay.module.css';
import type { DrawBox } from '../../core/types';

type Props = {
	drawBox: DrawBox | null
	svgUrl?: string
	hidden?: boolean
}

export default function SvgOverlay({
	drawBox,
	svgUrl,
	hidden
}: Props) {
	const navigate = useNavigate()
	const layerRef = useRef<HTMLDivElement | null>(null)
	
	const { data: markup } = useActiveSvg(svgUrl ?? null);
	useOverlayNavigation(layerRef, (id) => {
		if (!id) return
		navigate(`/flight/${encodeURIComponent(id)}`)
	})

	if (!drawBox || !markup || hidden) return null;
	const { dx, dy, dw, dh } = drawBox;
	
	return (
		<div className={styles.root} aria-label="svg-stop-overlay-root">
			<div
				ref={layerRef}
				className={styles.layer}
				style={{ left: dx, top: dy, width: dw, height: dh }}
			>
				<div
					className={styles.inlineSvg}
					dangerouslySetInnerHTML={{ __html: markup }}
				/>
			</div>
		</div>
	)
}
