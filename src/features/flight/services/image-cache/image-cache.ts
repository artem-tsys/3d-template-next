type Rec = { img: HTMLImageElement; at: number }

export class ImageCache {
	private store = new Map<number, Rec>();
	private clock = 0;
	private readonly capacity: number;
	
	constructor(capacity: number) {
		this.capacity = capacity
	}
	
	get(index: number): HTMLImageElement | undefined {
		const r = this.store.get(index)
		if (!r) return undefined
		r.at = ++this.clock
		return r.img
	}
	
	set(index: number, img: HTMLImageElement): void {
		if (!this.store.has(index) && this.store.size >= this.capacity) {
			let min = Infinity
			let evict = -1
			for (const [k, v] of this.store) if (v.at < min) { min = v.at; evict = k }
			if (evict >= 0) this.store.delete(evict)
		}
		this.store.set(index, { img, at: ++this.clock })
	}
	
	has(index: number): boolean {
		return this.store.has(index)
	}
}
