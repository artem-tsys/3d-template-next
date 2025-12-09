import { create } from "zustand";

interface FavouritesStore {
	favourites: string[];
	updateFavourite: (id: string) => void;
	isFavourite: (id: string) => boolean;
}

const useFavouritesStore = create<FavouritesStore>()((set, get) => ({
	favourites: [],
	updateFavourite: (id) => {
		const prevFavourites = get().favourites;
		const has = prevFavourites.includes(id);
		
		const nextFavourites = has ? prevFavourites.filter(f => f !== id) : [...prevFavourites, id];
		set({ favourites: nextFavourites });
	},
	isFavourite: (id: string) => get().favourites.includes(id),
}));

export default useFavouritesStore;
