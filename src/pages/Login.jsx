import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.scss";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../api/AuthContext.jsx";

const LoginPage = () => {
    const errorMessages = {
        EMAIL_INVALID: "Email không hợp lệ.",
        PASSWORD_INVALID: "Mật khẩu phải có ít nhất 8 ký tự.",
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const navigate = useNavigate();
    const { login, role } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Kiểm tra phía client
        const newFieldErrors = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            newFieldErrors.email = "EMAIL_INVALID";
        }
        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            return;
        }

        try {
            const response = await axiosInstance.post("/users/login-admin", {
                email: trimmedEmail,
                pwd: trimmedPassword,
            });
            const data = response.data;
            if (data.token && data.role === "ADMIN") {
                await login(data);
            } else {
                setError("Only admins can log in.");
            }
        } catch (err) {
            if (err.response?.data?.result && typeof err.response.data.result === "object") {
                setFieldErrors(err.response.data.result);
            } else {
                setError("Login failed! Check your email or password.");
            }
        }
    };

    useEffect(() => {
        if (role === "ADMIN") {
            navigate("/");
        }
    }, [role, navigate]);

    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setFieldErrors((prev) => ({ ...prev, email: null }));
                        }}
                        required
                    />
                    {fieldErrors.email && (
                        <p className="error-text">
                            {errorMessages[fieldErrors.email] || fieldErrors.email}
                        </p>
                    )}
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setFieldErrors((prev) => ({ ...prev, password: null }));
                            }}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                        {fieldErrors.password && (
                            <p className="error-text">
                                {errorMessages[fieldErrors.password] || fieldErrors.password}
                            </p>
                        )}
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;