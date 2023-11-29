import axios from "axios";

const createDiary = async (payload) => {
  const response = await axios.post("http://localhost:5200", payload);

  // const payload: {
  //     emotion: string;
  //     pet: string;
  //     diaryText: string;
  // }
  // https://www.example.com/diary

  return response;
};

export default createDiary;
