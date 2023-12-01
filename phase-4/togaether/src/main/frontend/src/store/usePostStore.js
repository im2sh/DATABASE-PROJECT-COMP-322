import { create } from "zustand";

const usePostStore = create((set) => ({
  imageUrl: "",
  setImageUrl: (value) =>
    set((state) => ({
      ...state,
      imageUrl: value,
    })),
  imageFile: null,
  setImageFile: (value) =>
    set((state) => ({
      ...state,
      imageFile: value,
    })),
  date: "",
  setDate: (value) =>
    set((state) => ({
      ...state,
      date: value,
    })),
  setLocationData: (value) =>
    set((state) => ({
      ...state,
      locationData: value,
    })),
  content: "",
  setContent: (value) =>
    set((state) => ({
      ...state,
      content: value,
    })),
}));

export default usePostStore;
