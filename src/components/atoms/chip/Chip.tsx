import { JSX, ReactNode } from "react";
import styles from "./chip.module.css";

interface Props {
	onClick: () => void;
	active: boolean | undefined;
	children: ReactNode;
}

export function Chip({
	onClick,
	active,
	children,
}: Props): JSX.Element {
	return <button
		type="button"
		className={`${styles.chip} ${active ? styles.chipActive : ''}`}
		onClick={onClick}
	>
		{children}
	</button>
}
