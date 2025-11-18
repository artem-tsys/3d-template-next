/** Базові інпути (клавіатура ←/→). Мишу/тач додамо окремо. */
export function createInputController(rotateToStop: (direction: 1 | -1) => void) {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') rotateToStop(1)
		if (e.key === 'ArrowLeft') rotateToStop(-1)
	}
	
	function mount(): void {
		window.addEventListener('keydown', handleKeyDown)
	}
	
	function unmount(): void {
		window.removeEventListener('keydown', handleKeyDown)
	}
	
	return { mount, unmount }
}
