import { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { useFlight } from './use-flight'
import { useFlightStore } from './use-flight-store'
import { nextActiveFrameIndex } from '../core/utils'

export function useControls() {
	const navigate = useNavigate()
	const { config, player } = useFlight()
	const index = useFlightStore(s => s.index)
	
	const goPrev = useCallback(() => {
		const target = nextActiveFrameIndex(index, -1 as const, config.stopFrames)
		player.playTo(target)
	}, [index, config.stopFrames, player])
	
	const goNext = useCallback(() => {
		const target = nextActiveFrameIndex(index, +1 as const, config.stopFrames)
		player.playTo(target)
	}, [index, config.stopFrames, player])
	
	const openPage = useCallback((id: string) => {
		navigate(`/${id}`)
	}, [navigate])
	
	return { goPrev, goNext, openPage }
}
