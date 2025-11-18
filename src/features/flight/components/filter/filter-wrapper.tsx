import { FilterClose } from "./filter-close";
import { FilterList } from "./filter-list";
import styles from './filter.module.css';
import { FilterControls } from "./filter-controls";

export function FilterWrap({ handleClose }: { handleClose: () => void }) {
	return <div className={styles.wrap}>
		<FilterClose handleClose={handleClose} />
		<h2>Підбір за параметрами</h2>
		<FilterControls />
		<FilterList />
	</div>
}
