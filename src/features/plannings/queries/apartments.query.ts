import { useEffect, useState } from "react";
import { Apartment, ApartmentFilters, ApartmentsResponse } from '../types'
import { http } from '@/shared/api/http';

/** Axios params serializer that repeats array keys: rooms=1&rooms=2 */
function serializeParams(obj: Record<string, unknown>): string {
	const params = new URLSearchParams()
	Object.entries(obj).forEach(([k, v]) => {
		if (v == null) return
		if (Array.isArray(v)) v.forEach(x => params.append(k, String(x)))
		else params.append(k, String(v))
	})
	return params.toString()
}

export async function fetchApartments(filters: ApartmentFilters): Promise<ApartmentsResponse> {
	// GET /plannings with query params (good for caching, shareable URLs)
	const resp = await http.get<ApartmentsResponse>('/plannings', {
		params: filters,
		paramsSerializer: { serialize: serializeParams },
	})
	return resp.data;
}

interface ApartmentState {
	data: Apartment[],
	isLoading: boolean,
	error: Error | null,
}

const defaultState: ApartmentState = { data: [], isLoading: true, error: null }

export function useApartments(filters: ApartmentFilters) {
	const [state, setApartmentsState] = useState<ApartmentState>(defaultState);
	
	useEffect(() => {
		fetchApartments(filters)
			.then((res) => {
				setApartmentsState({
					data: res.items ?? [],
					isLoading: false,
					error: null
				})
			})
			.catch((error) => {
				setApartmentsState({
					data: [],
					isLoading: false,
					error: error
				})
			})
	}, [filters])
	
	return state;
}
