import { ApartmentState } from '../../../hooks/useApartments';
import PlanningCard from '../card/planning-card';
import styles from './plannings-grid.module.css';

export default function PlanningsGrid({ data, isLoading, error }: ApartmentState) {

	if (isLoading) return <div className={styles.state}>Завантаження…</div>;
	if (error)     return <div className={styles.state}>Помилка завантаження</div>;
	if (!data.length) return <div className={styles.state}>Нічого не знайдено</div>;
	
	return (
		<div className={styles.grid}>
			{data.map(p => <PlanningCard key={p.id} p={p} />)}
		</div>
	);
}
