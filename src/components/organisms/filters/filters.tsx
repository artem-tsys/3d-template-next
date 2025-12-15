'use client'
import { useCallback, useMemo, useState } from 'react';
import { Filters } from "@/features/plannings/types";
import { LabelFilter } from "../../atoms/label/label-filter";
import { ApplyButton } from "../../molecules/apply-button/apply-button";
import { FilterSlider } from "../../molecules/filter-slider/filter-slider";
import { Chip } from "../../atoms/chip/Chip";
import { arraysEqual } from "@/libs/arrays-equal";
import { ResetButton } from "../../molecules/reset-button/reset-button";
import { usePlanningFilters } from '@/features/plannings/store/filter-store';
import styles from './filters.module.css';

interface LocalFilterState {
	rooms: number[];
	floorFrom: number;
	floorTo: number;
	minArea: number;
	maxArea: number;
	minPrice: number;
	maxPrice:  number;
	buildings: string[],
}

interface FilterProps {
	settings: Required<Filters>;
}

export default function FilterControl({ settings }: FilterProps) {
	const defaultFilterState: LocalFilterState = {
		rooms: [],
		floorFrom: settings.floorFrom ?? 0,
		floorTo: settings.floorTo ?? 0,
		minArea: settings.minArea ?? 0,
		maxArea: settings.maxArea ?? 0,
		minPrice: settings.minPrice ?? 0,
		maxPrice: settings.maxPrice ?? 0,
		buildings: [],
	};
	const { filters, setFilters, reset } = usePlanningFilters();
	
	const [localFilterState, setLocalFilterState] = useState<LocalFilterState>({
		...defaultFilterState,
		...filters,
	});

	const canApply = useMemo(() => {
		const roomsEqual = arraysEqual<number>(filters.rooms ?? [], localFilterState.rooms ?? []);
		const floorEqual =
			filters.floorFrom === localFilterState.floorFrom && filters.floorTo === localFilterState.floorTo;
		const areaEqual =
			filters.minArea === localFilterState.minArea && filters.maxArea === localFilterState.maxArea;
		const priceEqual =
			filters.minPrice === localFilterState.minPrice && filters.maxPrice === localFilterState.maxPrice;
		const buildingEqual = arraysEqual<string>(filters.buildings ?? [], localFilterState.buildings ?? []);
		
		return !(roomsEqual && areaEqual && floorEqual && priceEqual && buildingEqual);
	}, [localFilterState, filters]);
	
	const apply = useCallback(() => {
		setFilters(localFilterState)
	}, [
		setFilters,
		localFilterState
	]);
	
	const clear = useCallback(() => {
		reset();
		setLocalFilterState({
			...defaultFilterState,
			...filters,
		});
		apply();
	}, [reset, apply, filters, defaultFilterState]);
	
	const handleBuildingPreset = (val: string) => {
		return () => setLocalFilterState(prev => {
			return {
				...prev,
				building: prev.buildings.includes(val) ? prev.buildings.filter(x => x !== val) : [...prev.buildings, val]
			};
		});
	};
	
	const handleRoomPreset = (val: number) => {
		return () => setLocalFilterState(prev => {
			return {
				...prev,
				rooms: prev.rooms.includes(val) ? prev.rooms.filter(x => x !== val) : [...prev.rooms, val]
			};
		});
	};
	
	const setFloorRange = (value: [number, number]) => {
		setLocalFilterState((prev) => {
			return {
				...prev,
				floorFrom: value[0],
				floorTo: value[1]
			}
		})
	};
	
	const setAreaRange = (value: [LocalFilterState['minArea'], LocalFilterState['maxArea']]) => {
		setLocalFilterState((prev) => {
			return {
				...prev,
				minArea: value[0],
				maxArea: value[1]
			}
		})
	}
	
	const setPriceRange = (value: [LocalFilterState['minPrice'], LocalFilterState['maxPrice']]) => {
		setLocalFilterState((prev) => {
			return {
				...prev,
				minPrice: value[0],
				maxPrice: value[1]
			}
		})
	}
	return (
		<div>
			<div className={styles.group}>
				<LabelFilter>Будинок</LabelFilter>
				<div className={styles.chips}>
					{settings.buildings.map(n => {
						const active = localFilterState.buildings?.includes(n);
						return <Chip
							key={n}
							active={active}
							onClick={handleBuildingPreset(n)}
						>{n}</Chip>
					})}
				</div>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={settings.floorFrom}
					to={settings.floorTo}
					values={[localFilterState.floorFrom, localFilterState.floorTo]}
					step={1}
					label={<LabelFilter>Поверх</LabelFilter>}
					setRange={setFloorRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={settings.minArea}
					to={settings.maxArea}
					values={[localFilterState.minArea, localFilterState.maxArea]}
					label={<LabelFilter>Площа, м²</LabelFilter>}
					setRange={setAreaRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={settings.maxPrice}
					to={settings.maxPrice}
					values={[localFilterState.minPrice, localFilterState.maxPrice]}
					step={1000}
					label={<LabelFilter>Ціна</LabelFilter>}
					setRange={setPriceRange}
				/>
			</div>
			<div className={styles.group}>
				<LabelFilter>Кімнати</LabelFilter>
				<div className={styles.chips}>
					{settings.rooms.map(n => {
						const active = localFilterState.rooms?.includes(n);
						return <Chip
							key={n}
							active={active}
							onClick={handleRoomPreset(n)}
						>{n}</Chip>
					})}
				</div>
			</div>
			
			<div className={styles.actions}>
					<ApplyButton
						active={canApply}
						onClick={apply}
					>Застосувати</ApplyButton>
					
					<ResetButton onClick={clear} >Скинути</ResetButton>
			</div>
		</div>
	);
}
