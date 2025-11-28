import type { NextRequest } from 'next/server'
import { MOCK_PLANNINGS } from "../plannings/route";

export async function GET(_req: NextRequest) {
	const BUILDINGS_PRESETS = Array.from(
		new Set(MOCK_PLANNINGS.map(a => a.building))
	);
	
	const ROOM_PRESETS = Array.from(
		new Set(MOCK_PLANNINGS.map(a => a.rooms))
	).sort((a, b) => a - b);
	
	const AREA_MIN = Math.min(...MOCK_PLANNINGS.map(a => a.area));
	const AREA_MAX = Math.max(...MOCK_PLANNINGS.map(a => a.area));
	
	// Мінімальна та максимальна ціна
	const PRICE_MIN = Math.min(...MOCK_PLANNINGS.map(a => a.price));
	const PRICE_MAX = Math.max(...MOCK_PLANNINGS.map(a => a.price));
	
	// Діапазон поверхів
	const FLOOR_FROM = Math.min(...MOCK_PLANNINGS.map(a => a.floor));
	const FLOOR_TO = Math.max(...MOCK_PLANNINGS.map(a => a.floor));
	
	const filterSettings = {
		BUILDINGS_PRESETS,
		ROOM_PRESETS,
		AREA_MIN,
		AREA_MAX,
		FLOOR_FROM,
		FLOOR_TO,
		PRICE_MIN,
		PRICE_MAX,
	};
	
	return Response.json(filterSettings);
}
