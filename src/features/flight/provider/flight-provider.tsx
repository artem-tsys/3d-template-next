import React, { useEffect, useMemo } from 'react'
import { create } from 'zustand'
import type { SequenceConfig } from '../core/types'
import FlightContext, { type FlightStoreState } from './flight-context'
import { createSequenceController } from '../controllers/sequence-controller'
import { createPlayerController } from '../controllers/player-controller'
import { createInputController } from '../controllers/input-controller'
import { createMouseController } from '../controllers/mouse-controller'
import { subscribeWithSelector } from 'zustand/middleware'

interface FlightProviderProps {
	config: SequenceConfig;
	children: React.ReactNode
}

/** Провайдер фічі: нормалізує конфіг, створює store і контролери, підписує інпути та preload. */
export function FlightProvider({ config, children }: FlightProviderProps) {
	// 1) Один раз сортуємо стоп-кадри (читабельність і продуктивність)
	const normalizedConfig = useMemo<SequenceConfig>(() => {
		const stopFrames = [...config.stopFrames].sort((a, b) => a - b)
		const initial = ((config.initialFrame ?? 0) % config.frames + config.frames) % config.frames
		return { ...config, stopFrames, initialFrame: initial };
	}, [config])
	
	// 2) Zustand-стор фічі
	const store = useMemo(
		() => {
			const initial = normalizedConfig.initialFrame ?? 0;
			return create(subscribeWithSelector<FlightStoreState>((set) => ({
				index: initial,
				isPlaying: false,
				direction: 1,
				activeFrame: null,
				setIndex: (value) => set({index: value}),
				setIsPlaying: (value) => set({isPlaying: value}),
				setDirection: (value) => set({direction: value}),
				setActiveFrame: (value = null) => set({activeFrame: value})
			})));
			}, [normalizedConfig.initialFrame]
		)
	
	useEffect(() => {
		const stops = normalizedConfig.stopFrames
		
		const recompute = () => {
			const { index, isPlaying, activeFrame, setActiveFrame } = store.getState()
			const next = !isPlaying && stops.includes(index) ? index : null
			if (activeFrame !== next) setActiveFrame(next)
		}
		
		const unsubIdx  = store.subscribe(s => s.index,      recompute, { fireImmediately: true })
		const unsubPlay = store.subscribe(s => s.isPlaying,  recompute)
		
		// на зміну списку стопів (інший flight) — перерахувати раз
		recompute()
		
		return () => { unsubIdx(); unsubPlay() }
	}, [store, normalizedConfig.stopFrames])
	
	// 3) Контролери
	const sequence = useMemo(() => createSequenceController(normalizedConfig), [normalizedConfig])
	
	const player = useMemo(
		() =>
			createPlayerController(
				normalizedConfig,
				() => store.getState().index,
				(next) => store.getState().setIndex(next),
				() => store.getState().isPlaying,
				(v) => store.getState().setIsPlaying(v)
			),
		[normalizedConfig, store]
	)
	
	
	
	// 4) Інпути (←/→) → playToNextStop
	useEffect(() => {
		const input = createInputController((dir) => {
			store.getState().setDirection(dir)
			player.playToNextStop(dir)
		})
		input.mount()
		return () => input.unmount()
	}, [player, store])
	
	// 5) Мʼякий preload навколо активного кадру
	useEffect(() => {
		const unsubscribe = store.subscribe((s) => sequence.preloadAround(s.index))
		sequence.preloadAround(store.getState().index)
		return () => unsubscribe()
	}, [sequence, store])
	
	// Mouse controller (створюємо один раз; attach/detach робитиме UI)
	const mouse = useMemo(
		() =>
			createMouseController({
				framesTotal: normalizedConfig.frames,
				getIndex: () => store.getState().index,
				setIndex: (i) => store.getState().setIndex(i),
				playTo: (target) => player.playTo(target),
				stopFrames: normalizedConfig.stopFrames,
			}),
		[normalizedConfig, player, store]
	);
	
	return (
		<FlightContext.Provider value={
			{
				config: normalizedConfig,
				sequence,
				player,
				mouse,
				activeSvgs: config.activeSvgs,
				store
			}
		}>
			{children}
		</FlightContext.Provider>
	)
}
