import axios from "axios";

const createDiary = async ({
  place_id,
  place_name,
  address_name,
  emotion,
  pet_name,
  content,
}) => {
  const userId = localStorage.getItem("userId");
  const response = await axios.post(
    `http://localhost:8080/api/diary/create/${userId || "1"}/${
      place_id || "1"
    }`,
    {
      content,
      emotion,
    }
  );

  return response;
};

export default createDiary;
