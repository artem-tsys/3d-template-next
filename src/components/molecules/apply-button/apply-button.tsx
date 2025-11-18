import { Button } from "antd";
import cn from "clsx";
import { JSX } from "react";
import styles from "./apply.module.css";

interface Props {
	active?: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

export function ApplyButton({
	active = true,
	onClick,
	children,
}: Props): JSX.Element {
	return <Button className={
		cn(styles.apply, {[styles.apply_disabled]: !active})
	}
    onClick={onClick}
	>
		{
			children
		}
	</Button>
}
