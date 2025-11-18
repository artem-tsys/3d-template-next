import { JSX } from "react";
import styles from "@/components/organisms/filters/filters.module.css";

interface Props{
	children: React.ReactNode;
}

export function FilterHead({children}: Props): JSX.Element {
	return <div className={styles.head}>
		{children}
	</div>
}
