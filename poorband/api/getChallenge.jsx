import axios from "axios";
export async function getChallenge(newData) {
  const data = await axios.post(`http://localhost:9000/profile/challenge/list`, newData, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data;
}
