import axiosInstance from "./axiosInstance";

export const loginApi = async ({ username, password }) => {
    try {
        const response = await axiosInstance.post("/auth/login", { username, password });
        return response.data;
    } catch (error) {
        console.error("Login API Error", error); // Log error chi tiết
        throw error;
    }
};

export const registerApi = async ({ username, password, email }) => {
    try {
        const response = await axiosInstance.post("/users", {
            username,
            password,
            email,
            role: "USER",       // mặc định role là USER
        });
        return response.data;
    } catch (error) {
        console.error("Register API Error", error);
        throw error;
    }
};

export const introspectApi = async (token) => {
    try {
        const response = await axiosInstance.post("/auth/introspect", token);
        return response.data;
    } catch (error) {
        console.error("Register API Error", error); // Log error chi tiết
        throw error;
    }
};

export const currentUser = async () => {
    try {
        const response = await axiosInstance.get("/users/me");
        return response.data;
    } catch (error) {
        console.error("Error get user", error); // Log error chi tiết
        throw error;
    }
};