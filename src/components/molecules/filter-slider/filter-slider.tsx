import { InputNumber } from "antd";
import { JSX } from "react";
import Slider from "../slider/Slider";

interface FilterSliderProps {
	from: number;
	to: number;
	values: [number, number];
	label?: React.ReactNode;
	step?: number;
	setRange: (value: [number, number]) => void;
}

export function FilterSlider({
	from,
	to,
	values,
	label,
	setRange,
	step = 1,
}: FilterSliderProps): JSX.Element {
	const idFrom = "range-from";
	const idTo = "range-to";
	
	return <>
		{label || ''}
		<Slider
			range
			min={from}
			max={to}
			step={step}
			value={values}
			onChange={(v) => setRange(v as [number, number])}
		/>
		<div className='flex w-full gap-2 justify-between'>
			<InputNumber
				value={values[0]}
				max={to}
				aria-label="range from"
				name={idFrom}
				onChange={(v) => setRange([v as number, values[1]])}
			/>
			<InputNumber
				value={values[1]}
				min={from}
				aria-label="range to"
				name={idTo}
				onChange={(v) => setRange([values[0], v as number])}
			/>
		</div>
	</>
}
