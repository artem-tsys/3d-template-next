import { useFlight } from './use-flight'
import { useFlightStore } from './use-flight-store'

export interface OverlayState {
	isActive: boolean
	svgUrl?: string
}

export function useOverlayState(): OverlayState {
	const { config, activeSvgs } = useFlight()
	const index = useFlightStore(s => s.index)
	const activeFrame = useFlightStore(s => s.activeFrame)
	
	const atStop = config.stopFrames.includes(index)
	const svgUrl = activeFrame ? activeSvgs?.[activeFrame] : undefined
	const isActive = Boolean(atStop && svgUrl && activeFrame)
	return { isActive, svgUrl }
}
