import axios from "axios";

export async function getNowUser(article) {
  try {
    const data = await axios.get(`http://localhost:9000/profile/nowUser`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
      },
    });
    return data.data;
  } catch (error) {
    if (error.response.status === 403) {
      // 403 오류 발생 시 로그인 페이지로 이동
      window.location.href = "/login";
    }
    
    throw error; // 다른 오류는 그대로 throw하여 상위로 전파
  }
}
