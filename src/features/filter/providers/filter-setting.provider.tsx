'use client';

import { JSX, ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { Filters } from "../../plannings/types";
import { createFilterSettingsStore, FilterSettingsStore } from "../store/filter-settings.store";

interface Props {
	initialFilterSettings: Filters,
	children: ReactNode
}

export type FilterSettingsStoreApi = ReturnType<typeof createFilterSettingsStore>

export const FilterSettingsContext = createContext<FilterSettingsStoreApi | undefined>(
	undefined,
)

export function FilterSettingProvider({ initialFilterSettings, children }: Props): JSX.Element {
	// const { setSettings } = useFilterSettingsStore();
	
	// useEffect(() => {
	// 	if(initialFilterSettings) {
	// 		setSettings(initialFilterSettings)
	// 	}
	// }, []);
	
	const storeRef = useRef<FilterSettingsStoreApi | null>(null)
	if (storeRef.current === null) {
		storeRef.current = createFilterSettingsStore(initialFilterSettings)
	}
	
	return <FilterSettingsContext.Provider value={storeRef.current}>
			{children}
	</FilterSettingsContext.Provider>
}

export const useFilterSettingsStore = <T,>(
	selector: (store: FilterSettingsStore) => T,
): T => {
	const counterStoreContext = useContext(FilterSettingsContext)
	
	if (!counterStoreContext) {
		throw new Error(`useFilterSettingsStore must be used within FilterSettingsStoreProvider`)
	}
	
	return useStore(counterStoreContext, selector)
}
