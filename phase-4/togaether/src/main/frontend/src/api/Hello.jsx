import { useState, useEffect } from "react";
import axios from "axios";

const Hello = () => {
  const baseUrl = "http://localhost:8080";
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "/api/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
};

export default Hello;
