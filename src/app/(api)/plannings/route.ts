import { buildSchema, graphql } from "graphql";
import type { NextRequest } from 'next/server'
import type { Apartment } from '@/types/apartments.types'
import { FilterSettings } from "@/types/filter-settings.types";

export const MOCK_PLANNINGS: Apartment[] = Array.from({ length: 20 }).map((_, i) => ({
	id: `APT-${i + 1}`,
	building: `${(i % 2) + 1}`,
	rooms: (i % 4) + 1,
	area: 30 + i * 2,
	price: 50000 + i * 3500,
	floor: i + 2,
	imageUrl: `/assets/no-image.png`,
}))

const schema = buildSchema(`
  type Apartment {
    id: String!
    building: String!
    rooms: Int!
    area: Int!
    price: Int!
    floor: Int!
    imageUrl: String!
  }

  input Filters {
    BUILDINGS_PRESETS: [String]
    ROOM_PRESETS: [Int]
    AREA_MIN: Int
    AREA_MAX: Int
    PRICE_MIN: Int
    PRICE_MAX: Int
    FLOOR_FROM: Int
    FLOOR_TO: Int
  }

  type ApartmentsResult {
    items: [Apartment!]!
    count: Int!
  }

  type Query {
    apartments(filters: Filters): ApartmentsResult!
  }
`);

interface RootValue {
	apartments: ({ filters }: { filters?: Partial<FilterSettings>}) => { items: Apartment[]; count: number };
}

const rootValue: RootValue = {
	apartments: ({ filters = null }) => {
		let items = MOCK_PLANNINGS.slice();
		if (!filters) return { items, count: items.length };
		const {
			BUILDINGS_PRESETS,
			ROOM_PRESETS,
			AREA_MIN,
			AREA_MAX,
			FLOOR_FROM,
			FLOOR_TO,
			PRICE_MIN,
			PRICE_MAX
		} = filters ?? {};
		if (BUILDINGS_PRESETS != undefined) {
			items = items.filter((a) => BUILDINGS_PRESETS.includes(a.building));
		}
		
		if (ROOM_PRESETS != undefined) {
			items = items.filter((a) => ROOM_PRESETS.includes(Number(a.rooms)));
		}
		
		if (AREA_MIN != undefined) items = items.filter((a) => a.area >= AREA_MIN);
		if (AREA_MAX != undefined) items = items.filter((a) => a.area <= AREA_MAX);
		if (PRICE_MIN != undefined) items = items.filter((a) => a.price >= PRICE_MIN);
		if (PRICE_MAX != undefined) items = items.filter((a) => a.price <= PRICE_MAX);
		if (FLOOR_FROM != undefined) items = items.filter((a) => a.floor >= FLOOR_FROM);
		if (FLOOR_TO != undefined) items = items.filter((a) => a.floor <= FLOOR_TO);
		
		return { items, count: items.length };
	},
};

export async function POST(req: NextRequest) {
	const { query, variables } = await req.json();

	const result = await graphql({
		schema,
		source: query,
		rootValue,
		variableValues: variables,
	});
	
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

export async function GET() {
	return new Response("GraphQL endpoint: POST JSON { query, variables } to this url");
}

