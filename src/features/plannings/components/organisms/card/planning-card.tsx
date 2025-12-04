import { useEffect, useState } from "react";
import { SmallCardFavorite } from "@/components/molecules/favorite-button/presets";
import type { Apartment } from '@/types/apartments.types';
import DetailBtn from "../../atoms/details/detail-btn";
import MetaElement from "../../molecules/meta/meta-element";
import Image from 'next/image';
import styles from './planning-card.module.css';

export default function PlanningCard({ p }: { p: Apartment }) {
	const [isFavorite, setFavorite] = useState(false);
	const toggleFav = (id: string) => {
		console.log('toggleFav', id)
		setFavorite((current) => !current);
	}
	
	useEffect(() => {
		console.log('PlanningCard mounted');
	}, [])
	
	return (
		<article className={styles.root} aria-label={`planning-${p.id}`}>
			<Image className={styles.image} src={p.imageUrl} alt={`${p.rooms} кімнат`} loading='lazy' width={300} height={200} />
			<div className={styles.body}>
				<h3 className={styles.title}>{p.rooms} кімнатна - {p.area} <sup>2</sup></h3>
				<div className={styles.meta}>
					<MetaElement title="будинок" value={p.building} />
					<MetaElement title="кімнат" value={`${p.rooms}к`} />
					<MetaElement title="площа" value={`${p.area} м²`} />
				</div>
				<div className={styles.actions}>
					<SmallCardFavorite active={isFavorite} onClick={() => toggleFav(p.id)} ariaLabel="Додати до обраного" />
					<DetailBtn onClick={() => console.log(`Open details for ${p.id}`)}/>
				</div>
			</div>
		</article>
	);
}
