import axios from "axios";

export async function likeComment(commentInfo) {
  console.log(commentInfo);
  const data = await axios.post(`http://localhost:9000/comment/like`, commentInfo, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data.data;
}
