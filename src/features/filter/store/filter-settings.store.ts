import { createStore } from "zustand/vanilla";
import { FilterSettings } from "@/types/filter-settings.types";
import { Filters } from "../../plannings/types";

export type FilterSettingsStore = {
	settings: Filters,
	setSettings: (settings: Partial<FilterSettings>) => void;
}

const defaultSettings: Filters = {
	buildings: [],
	rooms: [],
	minArea: 0,
	maxArea: 0,
	floorFrom: 0,
	floorTo: 0,
	minPrice: 0,
	maxPrice: 0
}

export const createFilterSettingsStore = (
	initState: Filters = defaultSettings
) => {
	return createStore<FilterSettingsStore>()(set => ({
		settings: initState,
		setSettings: (value) => {
			set((s) => ({
				settings: { ...s.settings, ...value }
			}))
		}
	}));
};
