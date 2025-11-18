import React from 'react';
import FavoriteButtonCore from './favorite-button';
import styles from './favorite-button.module.css';

/** Конфіг пресету */
export type FavoritePreset = {
	id: string;
	sizeClass?: string;
	variantClass?: string;
	colorClass?: string;
	extraClass?: string;
};

/** Розумні пресети (твій проект може імпортувати і додавати нові пресети) */
export const presets: Record<string, FavoritePreset> = {
	smallCard: {
		id: 'smallCard',
		sizeClass: styles['size-sm'],
		variantClass: styles['variant-brand'],
		colorClass: 'text-gold', // можна використовувати utility class
	},
	toolbarSolidWhite: {
		id: 'toolbarSolidWhite',
		sizeClass: styles['size-md'],
		variantClass: styles['variant-solid'],
		colorClass: 'text-white',
	},
	ghostMedium: {
		id: 'ghostMedium',
		sizeClass: styles['size-md'],
		variantClass: styles['variant-ghost'],
		colorClass: 'text-brand',
	},
};

/** Фабрика: створює компонент, який прокидує пресет у ядро */
export function createFavoriteFromPreset(p: FavoritePreset) {
	return function PresetButton(props: Omit<React.ComponentProps<typeof FavoriteButtonCore>, 'sizeClass' | 'variantClass' | 'colorClass'>) {
		return <FavoriteButtonCore {...props} sizeClass={p.sizeClass} variantClass={p.variantClass} colorClass={p.colorClass} className={p.extraClass} />;
	};
}

/** Експорт готових компонентів */
export const SmallCardFavorite = createFavoriteFromPreset(presets.smallCard);
export const ToolbarSolidWhiteFavorite = createFavoriteFromPreset(presets.toolbarSolidWhite);
export const GhostMediumFavorite = createFavoriteFromPreset(presets.ghostMedium);
