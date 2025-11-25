import { JSX } from "react";
import { Close } from "@/components/molecules/close/close";
import styles from "@/components/organisms/filters/filters.module.css";
import FilterControl from "@/components/organisms/filters/filters";
import { useFilterSettingsStore } from "../../../../filter/store/filter-settings.store";

interface Props{
	handleClose: () => void;
}

export function FilterPanel({ handleClose }: Props): JSX.Element {
	const { settings: {BUILDINGS_PRESETS, ROOM_PRESETS, AREA_MIN, AREA_MAX, FLOOR_FROM, FLOOR_TO, PRICE_MIN, PRICE_MAX} } = useFilterSettingsStore()
	
	return <section className={styles.root} aria-label="filters">
		<div className={styles.head}>
			<h2 className={styles.title}>Підбір за параметрами</h2>
			<Close className={styles.close} onClick={handleClose}/>
		</div>
		<FilterControl
			BUILDINGS_PRESETS={BUILDINGS_PRESETS}
			ROOM_PRESETS={ROOM_PRESETS}
			AREA_MIN={AREA_MIN}
			AREA_MAX={AREA_MAX}
			FLOOR_FROM={FLOOR_FROM}
			FLOOR_TO={FLOOR_TO}
			PRICE_MIN={PRICE_MIN}
			PRICE_MAX={PRICE_MAX}
		/>
	</section>
}
