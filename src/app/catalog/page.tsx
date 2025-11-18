'use client';

import { FilterPanel } from "@/features/plannings/components/organisms/filter/filter-wrap.module";
import PlanningsGrid from "@/features/plannings/components/organisms/grid/plannings-grid";
import { useCallback, useState } from "react";
import { FilterOpen } from "@/components/molecules/filter-open/filter-open";
import styles from './catalog.module.css'

export default function Page() {
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
				<FilterPanel handleClose={handleCloseFilter}/>
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
