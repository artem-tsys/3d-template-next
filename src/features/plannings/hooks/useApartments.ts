import { useEffect, useRef, useState } from "react";
import { Apartment } from "@/types/apartments.types";
import { fetchApartments } from "../queries/apartments.query";
import { Filters } from "../types";

export interface ApartmentState {
	data: Apartment[],
	isLoading: boolean,
	error: Error | null,
}

const defaultState: ApartmentState = { data: [], isLoading: true, error: null }

export function useApartments(filters: Filters) {
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
