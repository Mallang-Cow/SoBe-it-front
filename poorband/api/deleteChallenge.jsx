import axios from "axios";

export async function deleteChallenge(goalAmountSeq) {
  console.log(goalAmountSeq);
  const data = await axios.post(`http://localhost:9000/profile/challenge/delete`, goalAmountSeq, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data.data;
}
