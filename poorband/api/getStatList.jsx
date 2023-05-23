import axios from "axios";

export async function getStatList(date) {
  const data = await axios.post(`http://localhost:9000/statistics/getExpenditure`, date, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });

  return data.data;
}
