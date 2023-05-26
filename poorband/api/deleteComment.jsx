import axios from "axios";

export async function deleteComment(commentSeq) {
  console.log(commentSeq);
  const data = await axios.post(`http://localhost:9000/comment/delete`, commentSeq, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data.data;
}
