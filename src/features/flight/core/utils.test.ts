import { nextIndex, nextActiveFrameIndex } from './utils'

describe('core/utils', () => {
	const stopFrames = [0, 45, 90, 135];
	const dirNext = 1;
	const dirPrev = -1;
	const totalFrames = 4;
	
	test('nextIndex wraps cyclically', () => {
		expect(nextIndex(0, dirPrev, totalFrames)).toBe(3)
		expect(nextIndex(3, dirNext, totalFrames)).toBe(0)
		expect(nextIndex(1, dirNext, totalFrames)).toBe(2)
	})
	
	test('nextActiveFrameIndex → right', () => {
		expect(nextActiveFrameIndex(10, dirNext, stopFrames)).toBe(45)
		expect(nextActiveFrameIndex(140, dirNext, stopFrames)).toBe(0)
	})
	
	test('nextActiveFrameIndex → left', () => {
		expect(nextActiveFrameIndex(100, dirPrev, stopFrames)).toBe(90)
		expect(nextActiveFrameIndex(5, dirPrev, stopFrames)).toBe(0)
		expect(nextActiveFrameIndex(0, dirPrev, stopFrames)).toBe(135)
	})
})
