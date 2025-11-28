import { FilterSettings } from "@/types/filter-settings.types";
import { Filters } from "../../plannings/types";

export const toApiPayload = (filters: Filters): Partial<FilterSettings> => {
	const payload: Partial<FilterSettings> = {};
	
	if (filters.rooms && filters.rooms.length) payload.ROOM_PRESETS = filters.rooms;
	if (filters.buildings && filters.buildings.length) payload.BUILDINGS_PRESETS = filters.buildings;
	if (filters.minArea != null) payload.AREA_MIN = filters.minArea;
	if (filters.maxArea != null) payload.AREA_MAX = filters.maxArea;
	if (filters.minPrice != null) payload.PRICE_MIN = filters.minPrice;
	if (filters.maxPrice != null) payload.PRICE_MAX = filters.maxPrice;
	if (filters.floorFrom != null) payload.FLOOR_FROM = filters.floorFrom;
	if (filters.floorTo != null) payload.FLOOR_TO = filters.floorTo;
	
	return payload;
};

export const fromApiPayload = (data: FilterSettings): Filters => ({
	rooms: data.ROOM_PRESETS ?? [],
	buildings: data.BUILDINGS_PRESETS ?? [],
	minArea: data.AREA_MIN,
	maxArea: data.AREA_MAX,
	minPrice: data.PRICE_MIN,
	maxPrice: data.PRICE_MAX,
	floorFrom: data.FLOOR_FROM,
	floorTo: data.FLOOR_TO,
});
