export type FlightClickHandler = (flightId: string) => void

export function attachOverlayNavigation(layer: HTMLElement, onFlight: FlightClickHandler) {
	const onClick = (e: MouseEvent) => {
		const el = (e.target as Element | null)?.closest('[data-flyby]')
		if (!el) return
		const flightId = el.getAttribute('data-flyby')
		if (!flightId) return
		onFlight(flightId)
	}
	layer.addEventListener('click', onClick)
	return () => layer.removeEventListener('click', onClick)
}
