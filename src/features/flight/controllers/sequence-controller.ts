import { framePath, loadImage } from '../services/image-loader/image-loader'
import { ImageCache } from '../services/image-cache/image-cache'
import type { SequenceConfig } from '../core/types'

/** Керує кадрами: ensure + м’який preload (LRU-кеш усередині). */
export function createSequenceController(config: SequenceConfig) {
	const cache = new ImageCache(48)
	
	async function ensure(index: number): Promise<HTMLImageElement> {
		const hit = cache.get(index)
		if (hit) return hit;
		const src = framePath(config.baseUrl, index, config.ext, config.zeroPad ?? 0)
		const img = await loadImage(src)
		cache.set(index, img)
		return img
	}
	
	function preloadAround(center: number, radius = 4): void {
		const list: number[] = [center]
		for (let d = 1; d <= radius; d++) {
			list.push((center + d) % config.frames, (center - d + config.frames) % config.frames)
		}
		void Promise.all(list.map((i) => (cache.has(i) ? undefined : ensure(i))))
	}
	
	return { ensure, preloadAround }
}
