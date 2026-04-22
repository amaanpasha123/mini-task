import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await api.post("/auth/login", formData);

            console.log("LOGIN RESPONSE:", res.data);

            const token = res.data?.token;

            // SAFE ROLE EXTRACTION (handles all backend formats)
            const role =
                res.data?.user?.role ||
                res.data?.role ||
                "user";

            if (!token) {
                throw new Error("Token not received from backend");
            }

            // store in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setMessage("Login successful ✔");

            // redirect based on role
            setTimeout(() => {
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }, 800);

        } catch (error) {
            console.log(error);
            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h2>Welcome Back</h2>
                <p className="subtitle">Login to continue</p>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Please wait..." : "Login"}
                    </button>

                </form>

                {message && <p className="message">{message}</p>}

                <p className="bottom-text">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;