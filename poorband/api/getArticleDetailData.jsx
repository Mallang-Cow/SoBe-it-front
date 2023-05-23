import axios from "axios";

export async function getArticleDetailData(articleSeq) {
  const data = await axios.get(`http://localhost:9000/article/detail?articleSeq=${articleSeq}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return data.data;
}
