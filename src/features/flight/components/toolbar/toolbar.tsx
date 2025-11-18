import { useControls } from "../../hooks/use-controls.ts";
import { useFlightStore } from "../../hooks/use-flight-store.ts";
import Controls from "../controls/controls.tsx";
import FlightMenu from "../controls/flight-menu.tsx";
import styles from './toolbar.module.css';

export function Toolbar({ handleOpenFilter }: { handleOpenFilter: () => void}) {
	const { goNext, goPrev, openPage } = useControls()
	
	const isPlaying = useFlightStore((s) => s.isPlaying);
	return (
		<div className={styles.root}>
			<div className={styles.arrows}>
				<Controls
					disabled={isPlaying}
					onRotateLeft={goPrev}
					onRotateRight={goNext}
				/>
			</div>
			<div className={styles.menu}>
				<FlightMenu onSelect={openPage}/>
			</div>
			<div className={styles.filter}>
				<button className={styles.btn} onClick={handleOpenFilter}>Filter</button>
			</div>
		</div>
	)
}
