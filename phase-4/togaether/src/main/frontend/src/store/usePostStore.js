import { create } from "zustand";

const usePostStore = create((set) => ({
  locationData: {
    place_id: "",
    place_name: "",
    address_name: "",
  },
  setLocationData: (value) =>
    set((state) => ({
      ...state,
      locationData: {
        place_id: value.place_id,
        place_name: value.place_name,
        address_name: value.address_name,
      },
    })),
}));

export default usePostStore;
