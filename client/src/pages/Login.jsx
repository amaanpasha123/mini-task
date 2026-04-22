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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await api.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            setMessage("Login successful ✔");

            setTimeout(() => {
                if (res.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }, 800);

        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
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