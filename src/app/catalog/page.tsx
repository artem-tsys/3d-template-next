import { notFound } from "next/navigation";
import { fetchFilterSettings } from "../../features/filter/queries/filter-settings.query";
import { ClientPage } from "./page-client";

export default async function Page() {
	let initialFilterSettings = null;
	try {
		initialFilterSettings = await fetchFilterSettings();
	} catch (e) {}
	
	if (!initialFilterSettings) {
		notFound();
	}
	
	return <ClientPage settings={initialFilterSettings} />
}
