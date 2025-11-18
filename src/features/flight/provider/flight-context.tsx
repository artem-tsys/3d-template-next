import { createContext } from 'react'
import type { StoreApi } from 'zustand'
import type { SequenceConfig, ActiveSvgMap } from '../core/types'

export interface FlightStoreState {
	index: number
	isPlaying: boolean
	direction: 1 | -1
	activeFrame: number | null
	setIndex: (value: number) => void
	setIsPlaying: (value: boolean) => void
	setDirection: (value: 1 | -1) => void
	setActiveFrame: (value: number | null) => void
}

interface FlightContextValue {
	config: SequenceConfig
	sequence: {
		ensure: (i: number) => Promise<HTMLImageElement>;
		preloadAround: (c: number, r?: number) => void
	}
	player: {
		playToNextStop: (d: 1 | -1) => void;
		playTo: (targetIndex: number) => void;
		stop: () => void
	}
	mouse?: { attach: (el: HTMLElement) => void; detach: () => void }
	activeSvgs?: ActiveSvgMap;
	store: StoreApi<FlightStoreState>
}

const FlightContext = createContext<FlightContextValue | null>(null)

export default FlightContext
