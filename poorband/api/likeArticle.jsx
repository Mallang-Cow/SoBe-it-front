import axios from "axios";

export async function likeArticle(articleSeq) {
  const data = await axios.post(`http://localhost:9000/article/like`, articleSeq, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data.data;
}
