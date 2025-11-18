import { ImageCache } from './image-cache'

function fakeImg(id: string): HTMLImageElement {
	return { id } as unknown as HTMLImageElement
}

describe('services/ImageCache (LRU)', () => {
	const cap = 2;
	const keyA = 1;
	const keyB = 2;
	const keyC = 3;
	
	test('stores and retrieves', () => {
		const cache = new ImageCache(cap)
		const imgA = fakeImg('a');
		const imgB = fakeImg('b');
		
		cache.set(keyA, imgA)
		cache.set(keyB, imgB)
		
		expect(cache.get(keyA)).toBe(imgA)
		expect(cache.get(keyB)).toBe(imgB)
	})
	
	test('evicts least recently used', () => {
		const cache = new ImageCache(cap)
		const imgA = fakeImg('a');
		const imgB = fakeImg('b');
		const imgC = fakeImg('c');
		
		cache.set(keyA, imgA);
		cache.set(keyB, imgB);
		
		// торкнемось A, щоб B стала найстарішою
		expect(cache.get(keyA)).toBe(imgA)
		
		cache.set(keyC, imgC) // витісняє keyB
		expect(cache.get(keyB)).toBeUndefined()
		expect(cache.get(keyA)).toBe(imgA)
		expect(cache.get(keyC)).toBe(imgC)
	})
})
