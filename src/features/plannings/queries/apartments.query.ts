import { useEffect, useRef, useState } from "react";
import { Apartment, ApartmentFilters, ApartmentsResponse } from '../types'
import { http } from '@/shared/api/http';

export async function fetchApartments(filters: ApartmentFilters): Promise<ApartmentsResponse> {
	const resp = await http.get<ApartmentsResponse>('/plannings', {
		params: filters,
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
	const abortRef = useRef<AbortController | null>(null)
	
	useEffect(() => {
		if (abortRef.current) abortRef.current.abort()
		abortRef.current = new AbortController()
		
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
