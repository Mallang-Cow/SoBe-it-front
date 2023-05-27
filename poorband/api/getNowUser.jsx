import axios from "axios";

export async function getNowUser(article) {
  const data = await axios.get(`http://localhost:9000/profile/nowUser`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return data.data;
}
