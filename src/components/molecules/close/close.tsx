import { CloseOutlined } from "@ant-design/icons";
import cn from "clsx";
import { JSX } from "react";

import styles from './close.module.css';

interface Props {
	className?: string;
	onClick: () => void;
	'aria-label'?: string;
}

export function Close({ className, onClick, 'aria-label': ariaLabel}: Props): JSX.Element {
	return <button aria-label={ariaLabel} className={cn(styles.button, className)} onClick={onClick}>
		<CloseOutlined className={styles.icon}/>
	</button>
}
