import axios from "axios";

export async function userLogin(loginData) {
  const data = await axios.post(`http://localhost:9000/auth/signin`, loginData, {
    header: {
      "Content-Type": "application/json",
    },
  });

  return data;
}
