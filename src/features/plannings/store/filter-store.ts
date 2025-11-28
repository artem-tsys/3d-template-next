import { create } from 'zustand';
import type { Filters } from '../types';

type FilterStore = {
	filters: Partial<Filters>;
	setFilters(filter: Partial<Filters>): void;
	reset(): void;
};

const initial: Partial<Filters> = {};

export const usePlanningFilters = create<FilterStore>((set) => ({
	filters: initial,
	setFilters: (settings) => {
		return set((state) => ({
			filters: {
				...state.filters,
				...settings,
			},
		}))
	},
	reset: () => set({ filters: initial }),
}));
