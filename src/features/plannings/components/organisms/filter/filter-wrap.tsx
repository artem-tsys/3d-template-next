import cn from "clsx";
import { JSX } from "react";
import { Close } from "@/components/molecules/close/close";
import styles from "./filter-wrap.module.css";

interface Props{
	handleClose: () => void;
	filter: JSX.Element;
	isOpen: boolean;
}

export function FilterPanel({ handleClose, filter, isOpen }: Props): JSX.Element {
	return <div className={styles.root} aria-label="filters">
		<div className={styles.head}>
			<h2 className={styles.title}>Підбір за параметрами</h2>
			<Close className={cn(styles.close, { [styles.close_open]: isOpen })} onClick={handleClose}/>
		</div>
		{filter}
	</div>
}
