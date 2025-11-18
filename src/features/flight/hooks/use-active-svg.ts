import { type QueryClient, useQuery } from "@tanstack/react-query";

export const SVG_CACHE_STALE_TIME = Infinity  // svg статичні
export const ONE_DAY_MS: number = 24 * 60 * 60 * 1000;
export const SVG_CACHE_GC_TIME = ONE_DAY_MS

/** Валідація, що це справді SVG, а не HTML-сторінка */
export function looksLikeSvg(text: string): boolean {
	return /^\s*<\?xml|^\s*<svg[\s>]/i.test(text)
}

export async function fetchInlineSvg(url: string): Promise<string> {
	const resp = await fetch(url, { redirect: 'follow' });
	const ctype = resp.headers.get('content-type') ?? '';
	const text = await resp.text();
	const typeOk = /image\/svg\+xml/i.test(ctype) || looksLikeSvg(text);
	if (!resp.ok || !typeOk) {
		throw new Error(`[SVG] Invalid response: ${url} (${resp.status})`)
	}
	return text;
}

export function useActiveSvg(url?: string | null) {
	return useQuery({
		queryKey: ['active-svg', url],
		queryFn: () => fetchInlineSvg(url!),
		enabled: Boolean(url),
		staleTime: SVG_CACHE_STALE_TIME,         // SVG статичні → не протухають
		gcTime: ONE_DAY_MS,
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	})
}

export function prefetchStopSvg(qc: QueryClient, url: string) {
	return qc.prefetchQuery({
		queryKey: ['active-svg', url],
		queryFn: () => fetchInlineSvg(url),
		staleTime: SVG_CACHE_STALE_TIME,
		gcTime: SVG_CACHE_GC_TIME,
	})
}
