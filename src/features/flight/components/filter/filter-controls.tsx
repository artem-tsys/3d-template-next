import { Slider } from "antd";
import { type JSX, useEffect, useState } from "react";
import useFilterStore from "../../hooks/use-filter";

export function FilterControls (): JSX.Element {
	const { filtersOptions, fetchFilterOptions, setFloorRange, setAreaRange, setActivePage, clearFilters, appliedFilters } = useFilterStore();
	const [localFloor, setLocalFloor] = useState<[number, number]>([1, 20]);
	const [localArea, setLocalArea] = useState<[number, number]>([10, 300]);
	
	// Load filter options from API once
	useEffect(() => {
		// fetchFilterOptions();
	}, [fetchFilterOptions]);
	
	// sync store -> local when store has values
	useEffect(() => {
		if (appliedFilters.floor) setLocalFloor(appliedFilters.floor);
		if (appliedFilters.area) setLocalArea(appliedFilters.area);
	}, [appliedFilters]);
	
	// debounce apply (simple)
	useEffect(() => {
		const id = setTimeout(() => {
			setFloorRange(localFloor);
			setAreaRange(localArea);
		}, 300);
		return () => clearTimeout(id);
	}, [localFloor, localArea, setFloorRange, setAreaRange]);
	
	const onChange = (value: number | number[]) => {
		console.log('value', value)
	}
	
	return (
		<div className="space-y-6">
			<div>
				<label className="block text-sm text-gray-300 mb-2">Поверх 56</label>
				<div className="flex items-center gap-4">
					<Slider
						range
						step={1}
						defaultValue={[filtersOptions?.floor?.min, filtersOptions?.floor?.max]}
						onChange={onChange}
					/>
					{/*<input type="number" value={localFloor[0]} onChange={(e) => setLocalFloor([Number(e.target.value), localFloor[1]])} className="w-16 rounded bg-gray-800 text-right p-2" />*/}
					{/*<div className="flex-1">*/}
					{/*	<input type="range" min={filtersOptions.floor?.min ?? 1} max={filtersOptions.floor?.max ?? 20} value={localFloor[0]} onChange={(e) => setLocalFloor([Number(e.target.value), localFloor[1]])} className="w-full" />*/}
					{/*	<input type="range" min={filtersOptions.floor?.min ?? 1} max={filtersOptions.floor?.max ?? 20} value={localFloor[1]} onChange={(e) => setLocalFloor([localFloor[0], Number(e.target.value)])} className="w-full mt-2" />*/}
					{/*</div>*/}
					{/*<input type="number" value={localFloor[1]} onChange={(e) => setLocalFloor([localFloor[0], Number(e.target.value)])} className="w-16 rounded bg-gray-800 text-right p-2" />*/}
				</div>
			</div>
			
			<div>
				<label className="block text-sm text-gray-300 mb-2">Площа м²</label>
				<div className="flex items-center gap-4">
					<input type="number" value={localArea[0]} onChange={(e) => setLocalArea([Number(e.target.value), localArea[1]])} className="w-20 rounded bg-gray-800 text-right p-2" />
					
					<div className="flex-1">
						<input type="range" min={filtersOptions.area?.min ?? 10} max={filtersOptions.area?.max ?? 300} value={localArea[0]} onChange={(e) => setLocalArea([Number(e.target.value), localArea[1]])} className="w-full" />
						<input type="range" min={filtersOptions.area?.min ?? 10} max={filtersOptions.area?.max ?? 300} value={localArea[1]} onChange={(e) => setLocalArea([localArea[0], Number(e.target.value)])} className="w-full mt-2" />
					</div>
					
					<input type="number" value={localArea[1]} onChange={(e) => setLocalArea([localArea[0], Number(e.target.value)])} className="w-20 rounded bg-gray-800 text-right p-2" />
				</div>
			</div>
			
			<div className="flex items-center gap-3">
				{[1, 2, 3].map((n) => (
					<button key={n} onClick={() => setActivePage(n)} className={`w-9 h-9 rounded-full flex items-center justify-center ${n === 3 ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-300'}`}>
						{n}
					</button>
				))}
				
				<button onClick={clearFilters} className="ml-4 flex items-center gap-2 text-sm text-gray-300">Скинути фільтр</button>
				
				<button onClick={() => {/* кнопка застосувати просто тригерить перезапит у store */}} className="ml-auto py-2 px-4 rounded bg-amber-400 text-black font-semibold">Застосувати</button>
			</div>
		</div>
	);
}
