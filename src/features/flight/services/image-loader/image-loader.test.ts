// мок для loader-утиліт
jest.mock('./image-loader.ts', () => ({
	framePath: (base: string, i: number, ext: string, pad = 0) =>
		`${base}/${pad ? String(i).padStart(pad, '0') : i}.${ext}`,
	loadImage: jest.fn(async (src: string) => ({ src } as unknown as HTMLImageElement)),
}))

import { createSequenceController } from '../../controllers/sequence-controller';
import { loadImage } from './image-loader'
import type { SequenceConfig } from '../../core/types'

describe('controllers/sequence-controller', () => {
	const baseUrl = '/assets/flight/genplan';
	const frames = 120;
	const ext = 'jpg' as const;
	const stopFrames = [0, 30, 60, 90];
	const zeroPad = 0;
	const preloadRadius = 2;
	const seedIndex = 10;
	
	const cfg: SequenceConfig = { baseUrl, frames, ext, stopFrames, zeroPad }
	
	test('ensure loads and caches images', async () => {
		const seq = createSequenceController(cfg)
		const first = await seq.ensure(0)
		const second = await seq.ensure(0)
		expect(second).toBe(first)
		expect((loadImage as jest.Mock).mock.calls.length).toBe(1)
	})
	
	test('preloadAround triggers nearby loads', async () => {
		const seq = createSequenceController(cfg)
		await seq.ensure(seedIndex)
		;(loadImage as jest.Mock).mockClear()
		
		seq.preloadAround(seedIndex, preloadRadius)
		await Promise.resolve() // microtask
		
		expect((loadImage as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1)
	})
})
