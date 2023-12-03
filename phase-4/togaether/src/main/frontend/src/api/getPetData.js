import axios from "axios";

const getPetData = async (placeId) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `http://localhost:8080/api/diary/create/${userId || "1"}/${
        placeId || "1"
      }`
    );
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default getPetData;
