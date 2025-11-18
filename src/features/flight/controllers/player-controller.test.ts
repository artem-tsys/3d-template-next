import { createPlayerController } from './player-controller'
import type { SequenceConfig } from '../core/types'

function makeStore(initialIndex = 0) {
	let index = initialIndex
	let isPlaying = false
	return {
		getIndex: () => index,
		setIndex: (i: number) => { index = i },
		getIsPlaying: () => isPlaying,
		setIsPlaying: (v: boolean) => { isPlaying = v },
	}
}

describe('controllers/player-controller', () => {
	const framesTotal = 12;
	const stopFrames = [0, 3, 6, 9] // кожен квартал
	const ext = 'jpg' as const;
	const baseUrl = '/assets/flight/genplan';
	const tickImmediate = 0;
	const waitMs = 5;
	const dirNext = 1;
	
	const cfg: SequenceConfig = { baseUrl, frames: framesTotal, ext, stopFrames }
	
	test('playToNextStop → right stops at nearest stop', async () => {
		const startIndex = 1
		const expectedStop = 3
		
		const s = makeStore(startIndex)
		const p = createPlayerController(cfg, s.getIndex, s.setIndex, s.getIsPlaying, s.setIsPlaying, tickImmediate)
		
		p.playToNextStop(dirNext)
		await new Promise((r) => setTimeout(r, waitMs))
		
		expect(s.getIndex()).toBe(expectedStop)
		expect(s.getIsPlaying()).toBe(false)
	})
	
	test('playTo chooses shortest direction', async () => {
		const startIndex = 11  // за крок до 0 по колу
		const targetIndex = 0  // найкоротший шлях: +1
		
		const s = makeStore(startIndex)
		const p = createPlayerController(cfg, s.getIndex, s.setIndex, s.getIsPlaying, s.setIsPlaying, tickImmediate)
		
		p.playTo(targetIndex)
		await new Promise((r) => setTimeout(r, waitMs))
		
		expect(s.getIndex()).toBe(targetIndex)
		expect(s.getIsPlaying()).toBe(false)
	})
})
