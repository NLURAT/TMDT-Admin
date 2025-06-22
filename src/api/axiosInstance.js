import axios from "axios";
import { API_BASE_URL } from "./ipConstant";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Không cần interceptors để gắn token nữa
// Nhưng vẫn giữ interceptor response để xử lý lỗi chung nếu cần

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token"); // Lấy token từ AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Alert.alert("Session Expired", "Please log in again.");
            // Có thể điều hướng người dùng tới màn hình đăng nhập
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
