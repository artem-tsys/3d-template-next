'use client';

import React, { useCallback, useState } from "react";
import { FilterOpen } from "../../components/molecules/filter-open/filter-open";
import FilterControl from "../../components/organisms/filters/filters";
import { PlanningsCount } from "../../features/plannings/components/atoms/count/count";
import { FilterPanel } from "../../features/plannings/components/organisms/filter/filter-wrap";
import PlanningsGrid from "../../features/plannings/components/organisms/grid/plannings-grid";
import { useApartments } from "../../features/plannings/hooks/useApartments";
import { usePlanningFilters } from "../../features/plannings/store/filter-store";
import { Filters } from "../../features/plannings/types";
import styles from "./catalog.module.css";

interface Props {
	settings: Required<Filters>
}

export const ClientPage: React.FC<Props> = ({ settings }) =>  {
	const filters = usePlanningFilters(store => store.filters);
	const { data: items, isLoading, error } = useApartments(filters);
	
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
					isOpen={openFilter}
					filter={<FilterControl settings={settings} />}
				/>
			</section>
			<div className={styles.filter_open}>
				<FilterOpen handleOpen={handleOpenFilter} />
			</div>
			<h3 className='text-[var(--color-white-200)] justify-self-end'>Планування</h3>
			<PlanningsCount count={items.length} className='justify-self-end' />
			<section className={styles.content}>
				<PlanningsGrid
					data={items}
					isLoading={isLoading}
					error={error}
				/>
			</section>
		</div>
	)
}
