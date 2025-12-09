import type { JSX } from "react";

interface CountProps{
	count: number;
	className: string
}

export function PlanningsCount({count, className}: CountProps): JSX.Element {
	return <span className={`text-[var(--color-text-white)] text-[10px] md:text-[12px] ${className}`}>Знайдено {count} квартир</span>
}
