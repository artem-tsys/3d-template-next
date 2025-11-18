import { create } from 'zustand';
import type { PlanningFilters } from '../types';

type FilterStore = {
	filters: PlanningFilters;
	setRooms(rooms: number[] | undefined): void;
	setRangeArea(min?: number, max?: number): void;
	setRangePrice(min?: number, max?: number): void;
	setRangeFloor(min?: number, max?: number): void;
	setBuilding(building: string[] | undefined): void;
	reset(): void;
};

const initial: PlanningFilters = {};

export const usePlanningFilters = create<FilterStore>((set) => ({
	filters: initial,
	setRooms: (rooms) => set((s) => ({ filters: { ...s.filters, rooms } })),
	setRangeArea: (minArea, maxArea) =>
		set((s) => ({ filters: { ...s.filters, minArea, maxArea } })),
	setRangePrice: (minPrice, maxPrice) =>
		set((s) => ({ filters: { ...s.filters, minPrice, maxPrice } })),
	setRangeFloor: (minFloor, maxFloor) =>
		set((s) => ({ filters: { ...s.filters, minFloor, maxFloor } })),
	setBuilding: (building) => set((s) => ({ filters: { ...s.filters, building } })),
	reset: () => set({ filters: initial }),
}));
