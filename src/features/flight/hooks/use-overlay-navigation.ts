import { useEffect } from 'react'
import type { RefObject } from 'react'
import { attachOverlayNavigation } from '../services/overlay-navigation/overlay-navigation';

export function useOverlayNavigation(layerRef: RefObject<HTMLElement | null>, onFlight: (id: string) => void) {
	useEffect(() => {
		const el = layerRef?.current
		if (!el) return
		return attachOverlayNavigation(el, onFlight);
	}, [layerRef, onFlight])
}
