import { http } from '@/shared/api/http';
import { FilterSettings } from "@/types/filter-settings.types";

export async function fetchFilterSettings(): Promise<FilterSettings> {
	const resp = await http.get<FilterSettings>('/filter-settings');
	return resp.data;
}
