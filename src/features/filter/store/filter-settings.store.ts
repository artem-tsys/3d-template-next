import { create } from "zustand";
import { FilterSettings } from "@/types/filter-settings.types";

type FilterSettingsStore = {
	settings: FilterSettings,
	setSettings: (settings: Partial<FilterSettings>) => void;
}

const defaultSettings = {
	BUILDINGS_PRESETS: [],
	ROOM_PRESETS: [],
	AREA_MIN: 0,
	AREA_MAX: 0,
	FLOOR_FROM: 0,
	FLOOR_TO: 0,
	PRICE_MIN: 0,
	PRICE_MAX: 0
}

export const useFilterSettingsStore = create<FilterSettingsStore>(set => ({
	settings: defaultSettings,
	setSettings: (value) => {
		set((s) => ({
			settings: { ...s.settings, ...value }
		}))
	}
}));
