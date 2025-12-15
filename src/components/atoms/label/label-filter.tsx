import { JSX } from "react";

interface Props {
	children: React.ReactNode;
	forForm?: string;
	className?: string;
}

export function LabelFilter({
	children,
	forForm,
	className
}: Props): JSX.Element {
	return <label
		htmlFor={forForm}
		className={`text-[12px] md:text-[16px] text-white ${className}`}
	>
		{children}
	</label>
}
