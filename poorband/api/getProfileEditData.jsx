import axios from "axios";

export async function getProfileEditData(formData) {
  const data = await axios.post(`http://localhost:9000/profile/save`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return data;
}
