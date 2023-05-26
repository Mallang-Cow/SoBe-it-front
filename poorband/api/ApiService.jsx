import axios from 'axios';
import { API_BASE_URL } from "./app-config";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

// 커스텀 axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// 인터셉터 추가
apiInstance.interceptors.request.use(
  (config) => {
    // 세션 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken !== null) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API 요청 함수
export function call(api, method, request) {
  return apiInstance({
    url: api,
    method: method,
    data: request ? JSON.stringify(request) : undefined
  })
    .then((response) => {
      if (response.data !== false && !response.data) {
        return Promise.reject(response);
      }

      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);

      if (error.response.status === 403) {
        window.location.href = "/login"; // redirect
      }

      return Promise.reject(error);
    });
}
