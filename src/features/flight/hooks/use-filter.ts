import { create } from 'zustand';
import { produce } from 'immer';

type FiltersOptions = {
	floor?: { min: number; max: number };
	area?: { min: number; max: number };
};

type Item = { id: string; type: string; rooms: number; floor: number; area: number };

type State = {
	// options for controls
	filtersOptions: FiltersOptions;
	fetchFilterOptions: () => Promise<void>;
	
	// applied filters
	appliedFilters: { floor?: [number, number]; area?: [number, number]; page?: number };
	setFloorRange: (r: [number, number]) => void;
	setAreaRange: (r: [number, number]) => void;
	setActivePage: (p: number) => void;
	clearFilters: () => void;
	
	// list
	list: Item[];
	page: number;
	pageSize: number;
	listLoading: boolean;
	listHasMore: boolean;
	fetchList: (replace: boolean) => Promise<void>;
};

const useFilterStore = create<State>((set, get) => ({
	filtersOptions: {
	
	},
	fetchFilterOptions: async () => {
		try {
			const res = await fetch('/api/filters');
			if (!res.ok) throw new Error('filters fetch failed');
			const json = await res.json();
			set(() => ({ filtersOptions: json }));
		} catch (e) {
			console.error(e);
		}
	},
	
	appliedFilters: { floor: [3, 6], area: [23, 148], page: 1 },
	setFloorRange: (r) => set(produce((s: State) => { s.appliedFilters.floor = r; s.appliedFilters.page = 1; })),
	setAreaRange: (r) => set(produce((s: State) => { s.appliedFilters.area = r; s.appliedFilters.page = 1; })),
	setActivePage: (p) => set(produce((s: State) => { s.appliedFilters.page = p; })),
	clearFilters: () => set(() => ({ appliedFilters: { floor: [1, 20], area: [10, 300], page: 1 } })),
	
	list: [],
	page: 1,
	pageSize: 20,
	listLoading: false,
	listHasMore: true,
	fetchList: async (replace = false) => {
		const { appliedFilters } = get();
		const nextPage = replace ? 1 : get().page;
		// if replace - reset page to 1
		if (replace) set(() => ({ page: 1, list: [], listHasMore: true }));
		
		// build query
		const params = new URLSearchParams();
		if (appliedFilters.floor) {
			params.set('floorMin', String(appliedFilters.floor[0]));
			params.set('floorMax', String(appliedFilters.floor[1]));
		}
		if (appliedFilters.area) {
			params.set('areaMin', String(appliedFilters.area[0]));
			params.set('areaMax', String(appliedFilters.area[1]));
		}
		params.set('page', String(nextPage));
		params.set('pageSize', String(get().pageSize));
		
		set(() => ({ listLoading: true }));
		try {
			const res = await fetch(`/api/list?${params.toString()}`);
			if (!res.ok) throw new Error('list fetch failed');
			const json = await res.json();
			// expected { items: Item[], hasMore: boolean }
			set(produce((s: State) => {
				s.list = replace ? json.items : s.list.concat(json.items);
				s.page = nextPage + 1;
				s.listHasMore = json.hasMore;
				s.listLoading = false;
			}));
		} catch (e) {
			console.error(e);
			set(() => ({ listLoading: false }));
		}
	},
}));

export default useFilterStore;
