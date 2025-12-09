import styles from "./meta.module.css";

interface IMetaElement{
	title: string;
	value: string;
}

export default function MetaElement({
	title,
	value,
}: IMetaElement){
	return <>
		<span className={styles.title}>{title}:</span>
		<span className={styles.separator}></span>
		<span className={styles.value}>{value}</span>
	</>
}
