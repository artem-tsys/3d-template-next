import type { Box, DrawBox } from "./types.ts";

export function nextIndex(cur: number, dir: 1 | -1, total: number): number {
	return (cur + dir + total) % total
}

export function nextActiveFrameIndex(current: number, dir: 1 | -1, stopFrames: number[]): number {
	if (dir === 1) {
		return stopFrames.find(v => v > current) ?? stopFrames[0];
	}
	for (let i = stopFrames.length - 1; i >= 0; i--) {
		if (stopFrames[i] < current) {
			return stopFrames[i];
		}
	}
	return stopFrames[stopFrames.length - 1];
}

export function computeDrawBox( canvas: Box, image: Box, mode: 'contain' | 'cover' = 'contain'): DrawBox {
	const { w: cw, h: ch } = canvas
	const { w: iw, h: ih } = image
	if (cw <= 0 || ch <= 0 || iw <= 0 || ih <= 0) return { dx: 0, dy: 0, dw: 0, dh: 0 }
	// contain => fit inside (scale = min), cover => fill and crop (scale = max)
	const scale = mode === 'cover' ? Math.max(cw / iw, ch / ih) : Math.min(cw / iw, ch / ih)
	const dw = Math.round(iw * scale)
	const dh = Math.round(ih * scale)
	const dx = Math.floor((cw - dw) / 2)
	const dy = Math.floor((ch - dh) / 2)
	return { dx, dy, dw, dh }
}

/** порівняння без перерендерів на дрібних коливаннях */
export function equalDrawBox(a?: DrawBox | null, b?: DrawBox | null): boolean {
	if (!a || !b) return a === b
	return a.dx === b.dx && a.dy === b.dy && a.dw === b.dw && a.dh === b.dh
}
