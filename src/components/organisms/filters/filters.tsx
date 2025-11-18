'use client'
import { useCallback, useMemo, useState } from 'react';
import { ApplyButton } from "../../molecules/apply-button/apply-button";
import { FilterSlider } from "../../molecules/filter-slider/filter-slider";
import { Chip } from "../../atoms/chip/Chip";
import { arraysEqual } from "../../../libs/arrays-equal";
import { ResetButton } from "../../molecules/reset-button/reset-button";
import { usePlanningFilters } from '../../../features/plannings/store/filter-store';
import styles from './filters.module.css';

const BUILDINGS_PRESETS = ['1', '2'];
const ROOM_PRESETS = [1, 2, 3, 4];
const AREA_MIN = 20, AREA_MAX = 150
const FLOOR_FROM = 1, FLOOR_TO = 24
const PRICE_MIN = 20000, PRICE_MAX = 250000

export default function FilterControl() {
	const { filters, setRooms, setRangeArea, setRangePrice, setRangeFloor, setBuilding, reset } = usePlanningFilters();
	
	const [roomsSel, setRoomsSel] = useState<number[] | undefined>(filters.rooms);
	const [floorRange, setFloorRange] = useState<[number, number]>(
		() => [filters.floorFrom ?? FLOOR_FROM, filters.floorTo ?? FLOOR_TO],
	);
	const [areaRange, setAreaRange] = useState<[number, number]>(
		() => [filters.minArea ?? AREA_MIN, filters.maxArea ?? AREA_MAX],
	);
	const [priceRange, setPriceRange] = useState<[number, number]>(
		() => [filters.minPrice ?? PRICE_MIN, filters.maxPrice ?? PRICE_MAX],
	);
	const [buildingSel, setBuildingSel] = useState<string[] | undefined>(filters.building);
	
	const canApply = useMemo(() => {
		const roomsEqual =
			(filters.rooms ?? undefined) === undefined
				? roomsSel === undefined
				: arraysEqual<number>(filters.rooms ?? [], roomsSel ?? []);
		const floorEqual =
			(filters.floorFrom ?? FLOOR_FROM) === floorRange[0] && (filters.floorTo ?? FLOOR_TO) === floorRange[1];
		const areaEqual =
			(filters.minArea ?? AREA_MIN) === areaRange[0] && (filters.maxArea ?? AREA_MAX) === areaRange[1];
		const priceEqual =
			(filters.minPrice ?? PRICE_MIN) === priceRange[0] && (filters.maxPrice ?? PRICE_MAX) === priceRange[1];
		const buildingEqual = (filters.building ?? undefined) === undefined
			? buildingSel === undefined
			: arraysEqual<string>(filters.building ?? [], buildingSel ?? []);
		
		return !(roomsEqual && areaEqual && floorEqual && priceEqual && buildingEqual);
	}, [roomsSel, areaRange, floorRange, priceRange, buildingSel, filters]);
	
	const apply = useCallback(() => {
		setRooms(roomsSel);
		setRangeArea(areaRange[0], areaRange[1]);
		setRangePrice(priceRange[0], priceRange[1]);
		setRangeFloor(floorRange[0], floorRange[1]);
		setBuilding(buildingSel);
	}, [
		roomsSel,
		areaRange,
		priceRange,
		floorRange,
		buildingSel,
		setRooms,
		setRangeArea,
		setRangePrice,
		setRangeFloor,
		setBuilding
	]);
	
	const clear = useCallback(() => {
		reset();
		setRoomsSel(undefined);
		setAreaRange([AREA_MIN, AREA_MAX]);
		setFloorRange([FLOOR_FROM, FLOOR_TO]);
		setPriceRange([PRICE_MIN, PRICE_MAX]);
		setBuildingSel(undefined);
	}, [reset]);
	
	const handleBuildingPreset = (val: string) => {
		return () => setBuildingSel(prev => {
			if (!prev) return [val];
			return prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val];
		});
	};
	
	const handleRoomPreset = (val: number) => {
		return () => setRoomsSel(prev => {
			if (!prev) return [val];
			return prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val];
		});
	};
	
	return (
		<div>
			<div className={styles.group}>
				<label className={styles.label}>Будинок</label>
				<div className={styles.chips}>
					{BUILDINGS_PRESETS.map(n => {
						const active = buildingSel?.includes(n);
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
					values={floorRange}
					label='Поверх'
					setRange={setFloorRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={AREA_MIN}
					to={AREA_MAX}
					values={areaRange}
					label={<label className={styles.label}>Площа, м²</label>}
					setRange={setAreaRange}
				/>
			</div>
			<div className={styles.group}>
				<FilterSlider
					from={PRICE_MIN}
					to={PRICE_MAX}
					values={priceRange}
					step={1000}
					label={<label className={styles.label}>Ціна</label>}
					setRange={setPriceRange}
				/>
			</div>
			<div className={styles.group}>
				<label>Кімнати</label>
				<div className={styles.chips}>
					{ROOM_PRESETS.map(n => {
						const active = roomsSel?.includes(n);
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
