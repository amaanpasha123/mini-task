import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const result = await dispatch(loginUser(formData));

        if (result.meta.requestStatus === "fulfilled") {
            const role = result.payload.role;
            setMessage("Login successful ✔");

            setTimeout(() => {
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }, 800);

        } else {
            setMessage(result.payload || "Login failed");
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
                {error && <p className="message error">{error}</p>}

                <p className="bottom-text">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
