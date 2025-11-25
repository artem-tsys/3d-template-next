'use client'

import { JSX, ReactNode, useEffect } from "react";
import { FilterSettings } from "../../../types/filter-settings.types";
import { useFilterSettingsStore } from "../store/filter-settings.store";

interface Props {
	initialFilterSettings: FilterSettings,
	children: ReactNode
}

export function FilterSettingProvider({ initialFilterSettings, children }: Props): JSX.Element {
	const { setSettings } = useFilterSettingsStore();
	

	useEffect(() => {
		if(initialFilterSettings) {
			setSettings(initialFilterSettings)
		}
	}, []);
	
	return <>{children}</>
}
