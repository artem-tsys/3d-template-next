import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest) {
	const filterSettings = {
		BUILDINGS_PRESETS: ["1", "2"],
		ROOM_PRESETS: [1, 2, 3, 4],
		AREA_MIN: 30,
		AREA_MAX: 68,
		FLOOR_FROM: 1,
		FLOOR_TO: 10,
		PRICE_MIN: 50000,
		PRICE_MAX: 116500,
	};
	
	return Response.json(filterSettings);
}
