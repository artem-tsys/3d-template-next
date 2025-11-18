import styles from './filter.module.css';
import type { JSX } from "react";

interface IProps{
	handleClose: () => void;
}

export function FilterClose({handleClose}: IProps): JSX.Element {
	return <button className={styles.closeBtn} onClick={handleClose}></button>
}
