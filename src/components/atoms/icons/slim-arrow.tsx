import React, { JSX } from "react";

interface Props {
	styles: string;
	
}

export function SlimArrow({ styles }: Props): JSX.Element {
	return <svg className={styles} viewBox="0 0 5 8" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.201343 8L8.84079e-09 7.84127L2.90985 3.99916L4.36735e-07 0.15873L0.201344 1.1202e-08L5 3.93651L5 4.09524L0.201343 8Z" />
	</svg>
}
