'use client';

import React, { useCallback, useState } from "react";
import { FilterOpen } from "../../components/molecules/filter-open/filter-open";
import FilterControl from "../../components/organisms/filters/filters";
import { FilterPanel } from "../../features/plannings/components/organisms/filter/filter-wrap";
import PlanningsGrid from "../../features/plannings/components/organisms/grid/plannings-grid";
import { Filters } from "../../features/plannings/types";
import styles from "./catalog.module.css";

interface Props {
	settings: Filters
}

export const ClientPage: React.FC<Props> = ({ settings }) =>  {
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
