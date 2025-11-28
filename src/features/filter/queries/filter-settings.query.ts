import { http } from '@/shared/api/http';
import { FilterSettings } from "@/types/filter-settings.types";
import { Filters } from "../../plannings/types";
import { fromApiPayload } from "../adapters/filters.adapter";

export async function fetchFilterSettings(): Promise<Filters> {
	const resp = await http.get<FilterSettings>('/filter-settings');
	return fromApiPayload(resp.data);
}
