import type { NextRequest } from 'next/server'
import type { Apartment } from '@/features/plannings/types'

export async function GET(_req: NextRequest, ctx: RouteContext<'/plannings'>) {
	return Response.json({ items: MOCK_PLANNINGS, count: MOCK_PLANNINGS.length})
}

const MOCK_PLANNINGS: Apartment[] = Array.from({ length: 20 }).map((_, i) => ({
	id: `APT-${i + 1}`,
	building: `${(i % 2) + 1}`,
	rooms: (i % 4) + 1,
	area: 30 + i * 2,
	price: 50000 + i * 3500,
	imageUrl: `/assets/no-image.png`,
}))
