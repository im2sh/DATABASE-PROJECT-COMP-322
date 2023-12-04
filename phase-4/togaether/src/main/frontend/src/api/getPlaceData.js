import axios from "axios";

const getPlaceData = async (keyword) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/place/search/${keyword || ""}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export default getPlaceData;
