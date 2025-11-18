import { useStore } from 'zustand'
import type { FlightStoreState } from '../provider/flight-context'
import { useFlight } from './use-flight'

export function useFlightStore<T>(selector: (s: FlightStoreState) => T): T {
	const { store } = useFlight()
	return useStore(store, selector)
}
