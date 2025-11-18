export function arraysEqual<T>(a: T[] | undefined, b: T[] | undefined) {
	if (a === b) return true;
	if (!a && !b) return true;
	if (!a || !b) return false;
	if (a.length !== b.length) return false;
	const sa = [...a].sort();
	const sb = [...b].sort();
	return sa.every((v, i) => v === sb[i]);
}
