import { toApiPayload } from "../../filter/adapters/filters.adapter";
import { Filters, ApartmentsResponse } from '../types'
import { http } from '@/shared/api/http';

const QUERY = `
  query Apartments($filters: Filters) {
    apartments(filters: $filters) {
      items {
        id
        building
        rooms
        area
        imageUrl
      }
      count
    }
  }
`;

type GraphQLError = { message: string };
type GraphQLResponse<T> = {
	data?: T;
	errors?: GraphQLError[];
};

export async function fetchApartments(
	filters: Filters,
	signal?: AbortSignal
): Promise<ApartmentsResponse> {
	const filtersParams = toApiPayload(filters);
	const res = await http.post<GraphQLResponse<{ apartments: ApartmentsResponse }>>(
		'/plannings',
		{ query: QUERY, variables: { filters: filtersParams } },
		{
		headers: { "Content-Type": "application/json" },
		signal,
	})
	
	const payload = res.data;
	
	if (!payload) {
		throw new Error("Empty response from server");
	}
	
	if (payload.errors?.length) {
		throw new Error(payload.errors.map((e) => e.message).join("; "));
	}
	
	const apartments = payload.data?.apartments;
	if (!apartments) {
		throw new Error("Malformed response: apartments data is missing");
	}
	
	return apartments;
}
