import axios from "axios";

const createDiary = async ({ placeId, petName, emotion, content }) => {
  const userId = localStorage.getItem("userId");
  const response = await axios.post(
    `http://localhost:8080/api/diary/create/${userId || "1"}/${placeId || "1"}`,
    {
      petName,
      content,
      emotion,
    }
  );

  return response;
};

export default createDiary;
