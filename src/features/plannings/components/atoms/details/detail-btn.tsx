import React from "react";
import styles from './detail.module.css'

interface DetailsBtnProps{
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DetailBtn({ onClick }: DetailsBtnProps) {
	return <button onClick={onClick} className={styles.detail_btn}>
		<span className={styles.detail_text}>детальніше</span>
		<svg className={styles.detail_icon} width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 1L7 7.5L0.5 14"/></svg>
	</button>
}
