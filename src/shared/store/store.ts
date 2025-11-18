import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Theme = 'light' | 'dark'
interface UiState { theme: Theme; setTheme: (t: Theme) => void }

export const useUiStore = create<UiState>()(
	persist(
		(set) => ({ theme: 'light', setTheme: (t) => set({ theme: t }) }),
		{ name: 'ui', storage: createJSONStorage(() => sessionStorage) }
	)
)
