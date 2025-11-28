export type ApartmentId = string;

export type Apartment = {
	id: ApartmentId;
	building: string;
	rooms: number;
	area: number;
	price: number;
	floor: number;
	imageUrl: string;
};
