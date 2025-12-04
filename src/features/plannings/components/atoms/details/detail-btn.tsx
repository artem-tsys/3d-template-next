import React from "react";
import { SlimArrow } from "../../../../../components/atoms/icons/slim-arrow";
import styles from './detail.module.css'

interface DetailsBtnProps{
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DetailBtn({ onClick }: DetailsBtnProps) {
	return <button onClick={onClick} className={styles.detail_btn}>
		<span className={styles.detail_text}>детальніше</span>
		<SlimArrow styles={styles.detail_icon} />
		{/*<svg className={} width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
		{/*	<path d="M0.201343 8L8.84079e-09 7.84127L2.90985 3.99916L4.36735e-07 0.15873L0.201344 1.1202e-08L5 3.93651L5 4.09524L0.201343 8Z" />*/}
		{/*</svg>*/}
	</button>
}
