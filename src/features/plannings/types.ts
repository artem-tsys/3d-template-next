import { Apartment } from "@/types/apartments.types";

export type ApartmentsResponse = {
	items: Apartment[];
	total: number;
};

export type Filters = {
	rooms?: number[];
	minArea?: number;
	maxArea?: number;
	minPrice?: number;
	maxPrice?: number;
	floorFrom?: number;
	floorTo?: number;
	buildings?: string[];
}
