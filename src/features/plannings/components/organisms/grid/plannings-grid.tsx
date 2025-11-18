import { usePlanningFilters } from '../../../store/filter-store';
import { useApartments } from '../../../queries/apartments.query';
import PlanningCard from '../card/planning-card';
import styles from './plannings-grid.module.css';

export default function PlanningsGrid() {
	const { filters } = usePlanningFilters();
	const { data: items, isLoading, error } = useApartments(filters);

	if (isLoading) return <div className={styles.state}>Завантаження…</div>;
	if (error)     return <div className={styles.state}>Помилка завантаження</div>;
	if (!items.length) return <div className={styles.state}>Нічого не знайдено</div>;
	
	return (
		<div className={styles.grid}>
			{items.map(p => <PlanningCard key={p.id} p={p} />)}
		</div>
	);
}
