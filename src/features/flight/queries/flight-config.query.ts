import type { FlightConfig } from "../core/types.ts";

export async function fetchFlightConfigById(id: string): Promise<FlightConfig> {
	const url = `/assets/flight/${encodeURIComponent(id)}/config.json`;
	const resp = await fetch(url, { redirect: 'follow' });

	if (!resp.ok) throw new Error(`[FlightConfig] ${resp.status} for ${url}`)
	const json = (await resp.json()) as FlightConfig
	if (!json || !json.baseUrl || !json.frames || !json.stopFrames) {
		throw new Error(`[FlightConfig] invalid shape for ${id}`)
	}
	return json
}
