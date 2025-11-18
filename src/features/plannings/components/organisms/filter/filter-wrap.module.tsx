import { JSX } from "react";
import { Close } from "@/components/molecules/close/close";
import styles from "@/components/organisms/filters/filters.module.css";
import FilterControl from "@/components/organisms/filters/filters";

interface Props{
	handleClose: () => void;
}

export function FilterPanel({ handleClose }: Props): JSX.Element {
	return <section className={styles.root} aria-label="filters">
		<div className={styles.head}>
			<h2 className={styles.title}>Підбір за параметрами</h2>
			<Close className={styles.close} onClick={handleClose}/>
		</div>
		<FilterControl />
	</section>
}
