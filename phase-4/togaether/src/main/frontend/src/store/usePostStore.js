import { create } from "zustand";

const usePostStore = create((set) => ({
  locationData: {
    placeId: "",
    placeName: "",
    detailAddress: "",
  },
  setLocationData: (value) =>
    set((state) => ({
      ...state,
      locationData: {
        placeId: value.placeId,
        placeName: value.placeName,
        detailAddress: value.detailAddress,
      },
    })),
}));

export default usePostStore;
