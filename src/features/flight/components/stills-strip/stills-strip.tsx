import styles from './stills-strip.module.css'
import type { SequenceConfig } from '../../core/types.ts'
import { framePath } from '../../services/image-loader/image-loader.ts'

interface Props {
	config: SequenceConfig
	onJump: (index: number) => void
}

export default function StillsStrip({ config, onJump }: Props) {
	return (
		<div className={styles.strip} aria-label="stills-strip">
			{config.stopFrames.map((idx) => (
				<button key={idx} type="button" className={styles.thumb} onClick={() => onJump(idx)} aria-label={`jump-to-${idx}`}>
					<img src={framePath(config.baseUrl, idx, config.ext, config.zeroPad ?? 0)} alt={`still ${idx}`} loading="lazy" />
				</button>
			))}
		</div>
	)
}
