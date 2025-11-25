'use client'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FilterSettings } from "../../../types/filter-settings.types";
import { ApplyButton } from "../../molecules/apply-button/apply-button";
import { FilterSlider } from "../../molecules/filter-slider/filter-slider";
import { Chip } from "../../atoms/chip/Chip";
import { arraysEqual } from "../../../libs/arrays-equal";
import { ResetButton } from "../../molecules/reset-button/reset-button";
import { usePlanningFilters } from '../../../features/plannings/store/filter-store';
import styles from './filters.module.css';

interface LocalFilterState {
	rooms: number[];
	floorFrom: number;
	floorTo: number;
	minArea: number;
	maxArea: number;
	minPrice: number;
	maxPrice:  number;
	building: string[],
}

type FilterState = FilterSettings & {}

export default function FilterControl({
	BUILDINGS_PRESETS,
	ROOM_PRESETS,
	AREA_MIN,
	AREA_MAX,
	FLOOR_FROM,
	FLOOR_TO,
	PRICE_MIN,
	PRICE_MAX
}: FilterState) {
	// const { BUILDINGS_PRESETS, ROOM_PRESETS, AREA_MIN, AREA_MAX, FLOOR_FROM, FLOOR_TO, PRICE_MIN, PRICE_MAX } = settings;
	const { filters, setFilters, reset } = usePlanningFilters();
	
	const [localFilterState, setLocalFilterState] = useState<LocalFilterState>({
		rooms: filters.rooms ?? [],
		floorFrom: filters.floorFrom ?? FLOOR_FROM,
		floorTo: filters.floorTo ?? FLOOR_TO,
		minArea: filters.minArea ?? AREA_MIN,
		maxArea: filters.maxArea ?? AREA_MAX,
		minPrice: filters.minPrice ?? PRICE_MIN,
		maxPrice: filters.maxPrice ?? PRICE_MAX,
		building: filters.building ?? [],
	});

	const canApply = useMemo(() => {
		const roomsEqual = arraysEqual<number>(filters.rooms ?? [], localFilterState.rooms ?? []);
		const floorEqual =
			filters.floorFrom === localFilterState.floorFrom && filters.floorTo === localFilterState.floorTo;
		const areaEqual =
			filters.minArea === localFilterState.minArea && filters.maxArea === localFilterState.maxArea;
		const priceEqual =
			filters.minPrice === localFilterState.minPrice && filters.maxPrice === localFilterState.maxPrice;
		const buildingEqual = arraysEqual<string>(filters.building ?? [], localFilterState.building ?? []);
		
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
			rooms: filters.rooms ?? [],
			floorFrom: filters.floorFrom ?? FLOOR_FROM,
			floorTo: filters.floorTo ?? FLOOR_TO,
			minArea: filters.minArea ?? AREA_MIN,
			maxArea: filters.maxArea ?? AREA_MAX,
			minPrice: filters.minPrice ?? PRICE_MIN,
			maxPrice: filters.maxPrice ?? PRICE_MAX,
			building: filters.building ?? [],
		});
		apply();
	}, [reset, apply, filters, AREA_MIN, AREA_MAX, FLOOR_FROM, FLOOR_TO, PRICE_MIN, PRICE_MAX]);
	
	const handleBuildingPreset = (val: string) => {
		return () => setLocalFilterState(prev => {
			return {
				...prev,
				building: prev.building.includes(val) ? prev.building.filter(x => x !== val) : [...prev.building, val]
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

	// useEffect(() => {
	// 	setLocalFilterState({
	// 		rooms: [],
	// 		floorFrom: FLOOR_FROM,
	// 		floorTo: FLOOR_TO,
	// 		minArea: AREA_MIN,
	// 		maxArea: AREA_MAX,
	// 		minPrice: PRICE_MIN,
	// 		maxPrice: PRICE_MAX,
	// 		building: [],
	// 	});
	// }, [
	// 	BUILDINGS_PRESETS,
	// 	ROOM_PRESETS,
	// 	AREA_MIN,
	// 	AREA_MAX,
	// 	FLOOR_FROM,
	// 	FLOOR_TO,
	// 	PRICE_MIN,
	// 	PRICE_MAX
	// ])
	
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
				<label className={styles.label}>Будинок</label>
				<div className={styles.chips}>
					{BUILDINGS_PRESETS.map(n => {
						const active = localFilterState.building?.includes(n);
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
					from={FLOOR_FROM}
					to={FLOOR_TO}
					values={[localFilterState.floorFrom, localFilterState.floorTo]}
					step={1}
					label='Поверх'
					setRange={setFloorRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={AREA_MIN}
					to={AREA_MAX}
					values={[localFilterState.minArea, localFilterState.maxArea]}
					label={<label className={styles.label}>Площа, м²</label>}
					setRange={setAreaRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={PRICE_MIN}
					to={PRICE_MAX}
					values={[localFilterState.minPrice, localFilterState.maxPrice]}
					step={1000}
					label={<label className={styles.label}>Ціна</label>}
					setRange={setPriceRange}
				/>
			</div>
			<div className={styles.group}>
				<label>Кімнати</label>
				<div className={styles.chips}>
					{ROOM_PRESETS.map(n => {
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
