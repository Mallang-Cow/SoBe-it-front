import axios from "axios";

export async function getComments(articleSeq) {
  const data = await axios.get(`http://localhost:9000/comment/selectAll?articleSeq=${articleSeq}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return data.data.data;
}
