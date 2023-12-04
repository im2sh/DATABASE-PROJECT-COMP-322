import { create } from "zustand";

const useKeywordSearchStore = create((set) => ({
  setKeywordSearchData: (value) =>
    set((state) => ({
      ...state,
      keywordSearchData: value,
    })),
}));

export default useKeywordSearchStore;
