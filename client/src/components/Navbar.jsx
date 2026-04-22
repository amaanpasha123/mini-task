import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // re-reads on every route change

    // Read from localStorage on every render (re-triggered by location change)
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    // Sync when route changes (covers login / logout navigation)
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setRole(localStorage.getItem("role"));
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="logo">Mini<span>Task</span></h2>

                <div className="nav-links">

                    {/* NOT LOGGED IN */}
                    {!token ? (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            {/* COMMON USER LINKS */}
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/tasks">Tasks</Link>

                            {/* ADMIN ONLY LINKS */}
                            {role === "admin" && (
                                <>
                                    <Link to="/admin">Admin Panel</Link>
                                    <Link to="/admin/users">Users</Link>
                                </>
                            )}

                            {/* LOGOUT */}
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
