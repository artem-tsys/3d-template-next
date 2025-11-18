import { useEffect, useRef, useState } from 'react';
import type { DrawBox } from "../../core/types";
import { computeDrawBox, equalDrawBox } from "../../core/utils.ts";
import { useFlight } from '../../hooks/use-flight';
import { useFlightStore } from '../../hooks/use-flight-store';
import { useOverlayState } from "../../hooks/use-overlay-state.ts";
import styles from './flyaround-canvas.module.css';
import SvgOverlay from "../svg-overlay/svg-overlay";

const PRELOAD_RADIUS = 4;                 // скільки сусідніх кадрів «підгрівати»
const IMAGE_SMOOTHING = true;             // вмикаємо згладжування
const IMAGE_SMOOTHING_QUALITY: ImageSmoothingQuality = 'high'; // якість згладжування

export default function FlyaroundCanvas() {
	const { sequence, mouse } = useFlight()
	const index = useFlightStore((s) => s.index)
	
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [size, setSize] = useState({ w: 0, h: 0 })
	const [drawBox, setDrawBox] = useState<DrawBox | null>(null)
	
	const { isActive, svgUrl } = useOverlayState()
	
	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		const ro = new ResizeObserver(() => {
			setSize({ w: el.clientWidth, h: el.clientHeight })
		})
		ro.observe(el)
		setSize({ w: el.clientWidth, h: el.clientHeight })
		return () => ro.disconnect()
	}, [])
	
	// 🔗 attach mouse/drag до контейнера
	useEffect(() => {
		const el = canvasRef.current
		if (!el || !mouse) return
		mouse.attach(el)
		return () => mouse.detach()
	}, [mouse])
	
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		let active = true
		
		const draw = async () => {
			try {
				const img = await sequence.ensure(index)
				if (!active) return;

				canvas.width = size.w
				canvas.height = size.h
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				
				const nextBox = computeDrawBox(
					{ w: canvas.width, h: canvas.height },
					{ w: img.width, h: img.height },
					'cover'
				)
				
				setDrawBox(prev => (equalDrawBox(prev, nextBox) ? prev : nextBox))
				
				ctx.imageSmoothingEnabled = IMAGE_SMOOTHING
				ctx.imageSmoothingQuality = IMAGE_SMOOTHING_QUALITY
				ctx.drawImage(img, nextBox.dx, nextBox.dy, nextBox.dw, nextBox.dh)
			} catch {
				// якщо кадр не завантажився — просто очищаємо полотно
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				setDrawBox(null)
			}
		}
		void draw()
		return () => { active = false }
	}, [index, size, sequence])
	
	// опціонально: мʼяко підгрівати сусідів (користується sequence.preloadAround усередині провайдера)
	useEffect(() => {
		sequence.preloadAround(index, PRELOAD_RADIUS)
	}, [index, sequence])
	
	return (
		<div ref={containerRef} className={styles.root} aria-label="flyaround-canvas">
			<canvas ref={canvasRef} className={styles.canvas} />
			<SvgOverlay
				drawBox={drawBox}
				svgUrl={svgUrl}
				hidden={!isActive}
			/>
		</div>
	)
}
