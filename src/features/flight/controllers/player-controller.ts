import { nextIndex, nextActiveFrameIndex } from '../core/utils'
import type { SequenceConfig } from '../core/types'

function chooseShortestDirection(current: number, target: number, total: number): 1 | -1 {
	const clockwise = (target - current + total) % total
	const counter = (current - target + total) % total
	return clockwise <= counter ? 1 : -1
}

/** Відтворення до найближчого стоп-кадра у вибраному напрямку. */
export function createPlayerController(
	config: SequenceConfig,
	getIndex: () => number,
	setIndex: (next: number) => void,
	getIsPlaying: () => boolean,
	setIsPlaying: (value: boolean) => void,
	tickMs: number = 12
) {
	let rafId: number | null = null
	
	function playToNextStop(direction: 1 | -1): void {
		if (getIsPlaying()) return
		setIsPlaying(true)
		
		const target = nextActiveFrameIndex(getIndex(), direction, config.stopFrames)
		let lastTick = performance.now()
		
		const step = () => {
			if (!getIsPlaying()) return
			const now = performance.now()
			if (now - lastTick >= tickMs) {
				const next = nextIndex(getIndex(), direction, config.frames)
				setIndex(next)
				lastTick = now
				if (next === target) {
					stop()
					return
				}
			}
			rafId = requestAnimationFrame(step)
		}
		
		rafId = requestAnimationFrame(step)
	}
	
	function stop(): void {
		setIsPlaying(false)
		if (rafId) cancelAnimationFrame(rafId)
		rafId = null
	}

	function runUntil(target: number, direction: 1 | -1) {
		if (getIsPlaying()) return;
		if (getIndex() === target) return;
		setIsPlaying(true)
		
		let lastTick = performance.now()
		const step = () => {
			if (!getIsPlaying()) return;
			const now = performance.now()
			if (now - lastTick >= tickMs) {
				const next = nextIndex(getIndex(), direction, config.frames)
				setIndex(next)
				lastTick = now
				if (next === target) {
					stop();
					return;
				}
			}
			rafId = requestAnimationFrame(step)
		}
		rafId = requestAnimationFrame(step)
	}
	
	function playTo(targetIndex: number): void {
		const current = getIndex()
		if (current === targetIndex) return
		const direction = chooseShortestDirection(current, targetIndex, config.frames)
		runUntil(targetIndex, direction)
	}
	
	return { playToNextStop, playTo, stop }
}
