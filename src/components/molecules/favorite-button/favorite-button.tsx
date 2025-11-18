import React from 'react'
import styles from './favorite-button.module.css'
import HeartIcon from './heart-icon'

type CoreFavoriteProps = {
	active?: boolean
	disabled?: boolean
	ariaLabel?: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	
	/* вхідні опції для кольору/контролю іконки */
	colorClass?: string        // приклад: 'text-brand' або 'text-red-500'
	iconClass?: string         // клас, який безпосередньо додається до <svg>
	cssVarColor?: string       // значення, яке буде передано у style: {'--fav-icon-color': cssVarColor}
	icon?: React.ReactNode
	sizeClass?: string
	variantClass?: string
	testId?: string
}

export default function FavoriteButtonCore({
	active = false,
	disabled = false,
	ariaLabel = 'Add to favorites',
	onClick,
	className,
	colorClass,
	iconClass,
	cssVarColor,
	icon,
	sizeClass,
	variantClass,
	testId,
}: CoreFavoriteProps) {
	const rootClass = [
		styles.root,
		sizeClass,
		variantClass,
		active ? styles.active : '',
		disabled ? styles.disabled : '',
		className
	].filter(Boolean).join(' ')
	
	// стиль для передачі CSS-перемінної, якщо cssVarColor заданий
	const style = cssVarColor ? { ['--fav-icon-color' as any]: cssVarColor } : undefined;
	
	return (
		<button
			type="button"
			className={`${rootClass} ${colorClass ?? ''}`}
			onClick={disabled ? undefined : onClick}
			aria-pressed={active}
			aria-label={ariaLabel}
			disabled={disabled}
			data-testid={testId}
			style={style}
		>
			{icon ?? <HeartIcon className={`${styles.icon} ${iconClass ?? ''}`} width="1em" height="1em" />}
		</button>
	)
}
