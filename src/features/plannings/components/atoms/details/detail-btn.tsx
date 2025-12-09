import React from "react";
import { SlimArrow } from "../../../../../components/atoms/icons/slim-arrow";
import styles from './detail.module.css'

interface DetailsBtnProps{
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DetailBtn({ onClick }: DetailsBtnProps) {
	return <button onClick={onClick} className={styles.detail_btn}>
		<span className={styles.detail_text}>детальніше</span>
		<div className={styles.detail_icon_wrap}>
			<SlimArrow styles={styles.detail_icon} />
		</div>
	</button>
}
