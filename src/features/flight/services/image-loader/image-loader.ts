export function buildFrameName(i: number, pad = 0): string {
	return pad ? String(i).padStart(pad, '0') : String(i)
}

export function framePath(base: string, i: number, ext: string, pad = 0): string {
	return `${base}/${buildFrameName(i, pad)}.${ext}`
}

export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		
		// Ставимо crossOrigin ТІЛЬКИ якщо інший origin
		try {
			const abs = new URL(src, window.location.origin);
			if (abs.origin !== window.location.origin) {
				img.crossOrigin = 'anonymous';
			}
		} catch { /* relative path — ок */ }
		
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(`Image load failed: ${src}`)); // ← ключове
		
		img.src = src;
	});
}
