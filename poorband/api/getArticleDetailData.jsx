import axios from "axios";

export async function getArticleDetailData(articleSeq) {
  const data = await axios.get(`http://localhost:3000/article/detail?articleSeq=${articleSeq}`);
  return data.data;
}
