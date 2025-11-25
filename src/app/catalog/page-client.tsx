'use client';

import { JSX, useCallback, useState } from "react";
import { FilterOpen } from "../../components/molecules/filter-open/filter-open";
import FilterControl from "../../components/organisms/filters/filters";
import { FilterPanel } from "../../features/plannings/components/organisms/filter/filter-wrap";
import PlanningsGrid from "../../features/plannings/components/organisms/grid/plannings-grid";
import { FilterSettings } from "../../types/filter-settings.types";
import styles from "./catalog.module.css";

interface Props{
	settings: FilterSettings
}

export function ClientPage({settings}: Props): JSX.Element {
	const [openFilter, setOpenFilter] = useState(false);
	const handleOpenFilter = useCallback(() => {
		setOpenFilter(true)
	}, [])
	
	const handleCloseFilter = useCallback(() => {
		setOpenFilter(false)
	}, [])
	
	return (
		<div className={styles.root}>
			<section className={`${styles.filter} ${openFilter ? styles.open : ''}`}>
				<FilterPanel
					handleClose={handleCloseFilter}
					filter={<FilterControl settings={settings} />}
				/>
			</section>
			<section className={styles.filter_open}>
				<FilterOpen handleOpen={handleOpenFilter} />
			</section>
			<section className={styles.content}>
				<PlanningsGrid />
			</section>
		</div>
	)
}
