import styles from './controls.module.css';

type Props = {
	onSelect(id: string): void
}

export default function FlightMenu({ onSelect }: Props) {
	return (
		<nav className={styles.menu} aria-label="Page menu">
			<button
				type="button"
				className={styles.menu_btn}
				onClick={() => onSelect('general')}
			>
				General
			</button>
			<button
				type="button"
				className={styles.menu_btn}
				onClick={() => onSelect('flight/1')}
			>
				House 1
			</button>
			<button
				type="button"
				className={styles.menu_btn}
				onClick={() => onSelect('flight/2')}
			>
				House 2
			</button>
			
			<button
				type="button"
				className={styles.menu_btn}
				onClick={() => onSelect('catalog')}
			>
				Plannings
			</button>
		</nav>

	)
}
