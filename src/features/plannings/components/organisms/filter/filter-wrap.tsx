import { JSX } from "react";
import { Close } from "@/components/molecules/close/close";
import styles from "@/components/organisms/filters/filters.module.css";

interface Props{
	handleClose: () => void;
	filter: JSX.Element;
}

export function FilterPanel({ handleClose, filter }: Props): JSX.Element {
	return <section className={styles.root} aria-label="filters">
		<div className={styles.head}>
			<h2 className={styles.title}>Підбір за параметрами</h2>
			<Close className={styles.close} onClick={handleClose}/>
		</div>
		{filter}
	</section>
}
