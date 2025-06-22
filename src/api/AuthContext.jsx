import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            try {
                const savedToken = localStorage.getItem("token");
                const savedRole = localStorage.getItem("role");
                if (savedToken && savedRole === "ADMIN") {
                    setToken(savedToken);
                    setRole(savedRole);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setRole(null);
                    setToken(null);
                }
            } catch (error) {
                console.error("Error reading token from localStorage:", error);
            }
        };
        checkLoginStatus();
    }, []);

    const login = async (data) => {
        try {
            const newToken = data.token;
            const updateRole = data.role;
            if (updateRole !== "ADMIN") {
                throw new Error("Only admins can log in.");
            }
            localStorage.setItem("token", newToken);
            localStorage.setItem("role", updateRole);
            setToken(newToken);
            setRole(updateRole);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setIsLoggedIn(false);
            setRole(null);
            setToken(null);
        } catch (error) {
            console.error("Error removing token from localStorage:", error);
        }
    };

    const resetAuth = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setIsLoggedIn(false);
            setRole(null);
            setToken(null);
            console.log("Đã xóa token và đặt lại trạng thái đăng nhập.");
        } catch (error) {
            console.error("Không thể xóa token:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, role, token, resetAuth }}>
            {children}
        </AuthContext.Provider>
    );
};