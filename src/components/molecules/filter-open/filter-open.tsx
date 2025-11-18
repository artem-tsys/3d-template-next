import Image from 'next/image';
import type { JSX } from "react";
import styles from './filter-open.module.css';
import filter from '../../../assets/icons/filter.svg';

interface Props{
	handleOpen: () => void;
}

export function FilterOpen({ handleOpen }: Props): JSX.Element {
	return <button onClick={handleOpen} className={styles.btn}>
		<Image src={filter} alt="filter open" className={styles.icon}/>
	</button>
}
