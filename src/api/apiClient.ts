// src/api/apiClient.ts
import axios from "axios";
import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL, // เปลี่ยนเป็น URL จริง
  timeout: 50000, // ระยะเวลารอ response (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (สำหรับการเพิ่ม Token หรือ Header อื่น ๆ)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ดึง Token จาก localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (จัดการ Error หรือ Response)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      // handle unauthorized cases
    }
    return Promise.reject(error);
  }
);

export default apiClient;
