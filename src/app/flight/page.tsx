'use client';

import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlightConfig } from "@/features/flight/hooks/use-flight-config";
import { FilterWrap } from "@/features/flight/components/filter/filter-wrapper";
import { Toolbar } from "@/features/flight/components/toolbar/toolbar";
import styles from './flight.module.css'
import { FlightProvider } from '@/features/flight/provider/flight-provider'
import FlyaroundCanvas from '@/features/flight/components/flyaround-canvas/flyaround-canvas'
import StillsStrip from '@/features/flight/components/stills-strip/stills-strip'
import { useFlight } from '@/features/flight/hooks/use-flight'

function Stills() {
	const { config, player } = useFlight()
	return <StillsStrip config={config} onJump={(idx) => player.playTo(idx)} />
}

export default function Page() {
	const { id = 'genplan' } = useParams<{ id: string }>()
	const { data: config, isLoading, error } = useFlightConfig(id);
	const [openFilter, setOpenFilter] = useState(false);
	
	const handleOpenFilter = useCallback(() => {
		setOpenFilter(true)
	}, [])
	const handleCloseFilter = useCallback(() => {
		setOpenFilter(false)
	}, [])
	
	if (isLoading) return <div className={styles.loader}>Loading…</div>
	if (error || !config) return <div className={styles.error}>Failed to load scene</div>
	
	
	return (
		<div className={styles.root}>
			<FlightProvider config={config}>
				<section className={styles.stage} aria-label="flight-stage">
					<FlyaroundCanvas />
				</section>
				<section className={styles.toolbar} aria-label="flight-toolbar">
					<Toolbar handleOpenFilter={handleOpenFilter}/>
				</section>
				<section className={styles.stills} aria-label="flight-stills">
					<Stills />
				</section>
				<section className={`${styles.filter} ${openFilter ? styles.open : ''}`}>
					<FilterWrap handleClose={handleCloseFilter}/>
				</section>
			</FlightProvider>
		</div>
	)
}
