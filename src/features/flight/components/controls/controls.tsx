import styles from './controls.module.css'

interface Props {
	onRotateLeft: () => void
	onRotateRight: () => void
	disabled?: boolean
}

export default function Controls({ onRotateLeft, onRotateRight, disabled }: Props) {
	return (
		<div className={styles.controls} role="group" aria-label="flight-controls">
			<button type="button" className={styles.btn} onClick={onRotateLeft} disabled={disabled} aria-label="rotate-left">◀</button>
			<button type="button" className={styles.btn} onClick={onRotateRight} disabled={disabled} aria-label="rotate-right">▶</button>
		</div>
	)
}
