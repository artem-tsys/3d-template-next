import { useContext } from 'react'
import FlightContext from '../provider/flight-context'

export function useFlight() {
	const ctx = useContext(FlightContext)
	if (!ctx) throw new Error('useFlight must be used within FlightProvider')
	return ctx
}
