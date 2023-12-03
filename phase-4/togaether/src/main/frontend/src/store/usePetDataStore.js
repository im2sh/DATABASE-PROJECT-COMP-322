import { create } from "zustand";
import getPetData from "../api/getPetData";

const usePetDataStore = create((set) => ({
  petData: null,
  petName: "",
  setPetData: async (placeId) => {
    const response = await getPetData(placeId);
    console.log(response);
    set({
      petData: response.data,
      petName: response.data.map((pet) => pet.petName).join(", "),
    });
  },
}));

export default usePetDataStore;
