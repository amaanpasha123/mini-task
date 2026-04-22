import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    useEffect(() => {
        const interval = setInterval(() => {
            setToken(localStorage.getItem("token"));
            setRole(localStorage.getItem("role"));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
        navigate("/login");
    };

    return (
        <nav>
            {!token ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/tasks">Tasks</Link>

                    {role === "admin" && (
                        <>
                            <Link to="/admin">Admin</Link>
                            <Link to="/admin/users">Users</Link>
                        </>
                    )}

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
