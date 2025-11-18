import { JSX } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./reset-button.module.css";

interface Props {
	onClick: () => void;
	children: React.ReactNode;
}

export function ResetButton({
	onClick,
	children
}: Props): JSX.Element {
	return <Button onClick={onClick} className={styles.reset}>
		<DeleteFilled  />
		{children}
	</Button>
}
