import { create } from "zustand";

export const useGlobalStates = create((set) => ({
  apiUrl: "http://localhost:8000/api",
  book: "",
  home: null,
  setHome: (home) => set({ home }),
  setApiUrl: (apiUrl) => set({ apiUrl }),
  setBook: (book) => set({ book }),
}));
