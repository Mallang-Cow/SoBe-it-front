import axios from "axios";

export async function writeComment(newData) {
  console.log(newData);
  const data = await axios.post(`http://localhost:9000/comment/write`, newData, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data;
}
