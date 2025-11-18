import { useQuery } from "@tanstack/react-query";
import { fetchFlightConfigById } from "../queries/flight-config.query.ts";

export const CACHE_STALE_TIME = Infinity;
export const CACHE_TIME_MS: number = 4 * 60 * 60 * 1000;

export function useFlightConfig(id?: string) {
	return useQuery({
		queryKey: ['flight-config', id],
		queryFn: () => fetchFlightConfigById(id!),
		enabled: Boolean(id),
		staleTime: CACHE_STALE_TIME,
		gcTime: CACHE_TIME_MS,
		retry: 1,
	})
}
