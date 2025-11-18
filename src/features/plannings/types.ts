export type ApartmentId = string;

export type Apartment = {
	id: ApartmentId;
	building: string;
	rooms: number;
	area: number;
	price: number;
	imageUrl: string;
};

export type ApartmentFilters = {
	building?: string[];
	viewMode?: 'exterior' | 'interior' | 'plans' | 'genplan';
	section?: string;
	floorFrom?: number;
	floorTo?: number;
	rooms?: number[];
	minArea?: number;
	maxArea?: number;
	minPrice?: number;
	maxPrice?: number;
};

export type ApartmentsResponse = {
	items: Apartment[];
	total: number;
};

export type PlanningFilters = {
	rooms?: number[];
	minArea?: number;
	maxArea?: number;
	minPrice?: number;
	maxPrice?: number;
	floorFrom?: number;
	floorTo?: number;
	building?: string[];
}
