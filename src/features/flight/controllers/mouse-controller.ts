/** Константи (читабельно, без магічних чисел) */
const TURNS_PER_VIEWPORT = 1 as const;   // чутливість drag: скільки кадрів на 1px
const MIN_DRAG_PX_TO_MOVE = 10 as const;   // поріг, щоб ігнорувати мікрорухи

export interface MouseControllerDeps {
	framesTotal: number;
	getIndex: () => number;
	setIndex: (i: number) => void;
	playTo: (target: number) => void; // з player-controller
	stopFrames: number[];
}

function cyclicDistance(a: number, b: number, total: number): number {
	const cw = (b - a + total) % total;
	const ccw = (a - b + total) % total;
	return Math.min(cw, ccw);
}

function nearestStopFrame(current: number, stops: number[], total: number): number {
	let best = stops[0];
	let bestDist = cyclicDistance(current, best, total);
	for (let i = 1; i < stops.length; i++) {
		const s = stops[i];
		const d = cyclicDistance(current, s, total);
		if (d < bestDist) { best = s; bestDist = d; }
	}
	return best;
}

/** Керує drag-сценарієм: крутить сцену під час тягнення, на mouseup — дотягує до найближчого стоп-кадра. */
export function createMouseController(deps: MouseControllerDeps) {
	const { framesTotal, getIndex, setIndex, playTo, stopFrames } = deps;
	
	let el: HTMLElement | null = null;
	let dragging = false;
	let startX = 0;
	let startIndex = 0;
	let accum = 0;
	let moved = false;
	
	const onPointerDown = (e: PointerEvent) => {
		if (!el) return;
		dragging = true;
		startX = e.clientX;
		startIndex = getIndex();
		accum = 0;
		moved = false;
		e.preventDefault();
	};
	
	const onPointerMove = (e: PointerEvent) => {
		if (!dragging || !el) return;
		const dx = e.clientX - startX;
		if (Math.abs(dx) < MIN_DRAG_PX_TO_MOVE) return;
		
		el.setPointerCapture(e.pointerId);
		const width = Math.max(1, el.clientWidth);
		const pixelsPerFrame = (width * TURNS_PER_VIEWPORT) / framesTotal;
		
		const framesDeltaFloat = dx / pixelsPerFrame;                 // ← ключова зміна
		const deltaSinceLast = Math.trunc(framesDeltaFloat - accum);
		if (deltaSinceLast !== 0) {
			accum += deltaSinceLast;
			const next = ((startIndex + Math.trunc(accum)) % framesTotal + framesTotal) % framesTotal;
			if (next !== getIndex()) {
				setIndex(next);
				moved = true;
			}
		}
	};
	
	const onPointerUp = () => {
		if (!dragging) return;
		dragging = false;
		
		if (!moved) {
			return;
		}

		const current = getIndex();
		const target = nearestStopFrame(current, stopFrames, framesTotal);
		// дотягуємо найкоротшим шляхом (усередині playTo обчислюється напрям)
		playTo(target);
	};
	
	function attach(target: HTMLElement) {
		if (el === target) return;
		detach();
		el = target;
		
		window.addEventListener('pointerdown', onPointerDown);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
		el.addEventListener('pointercancel', onPointerUp, { passive: true })
		el.addEventListener('lostpointercapture', onPointerUp, { passive: true })
	}
	
	function detach() {
		if (!el) return;
		window.removeEventListener('pointerdown', onPointerDown);
		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerup', onPointerUp);
		el.removeEventListener('pointercancel', onPointerUp)
		el.removeEventListener('lostpointercapture', onPointerUp)
		
		el = null;
		dragging = false;
		moved = false;
	}
	
	return { attach, detach };
}
