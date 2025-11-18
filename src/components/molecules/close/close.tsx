import { CloseOutlined } from "@ant-design/icons";
import cn from "clsx";
import { JSX } from "react";

import styles from './close.module.css';

interface Props {
	className?: string;
	onClick: () => void;
	'area-label'?: string;
}

export function Close({ className, onClick, 'area-label': ariaLabel}: Props): JSX.Element {
	return <button area-label={ariaLabel} className={cn(`${styles.button} ${className}`)} onClick={onClick}>
		<CloseOutlined className={styles.icon}/>
	</button>
}
