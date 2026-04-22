import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // 👈 IMPORTANT

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // 👈 clear role too
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="logo">MiniTask</h2>

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

                            {/* 🔐 ADMIN ONLY LINKS */}
                            {role === "admin" && (
                                <>
                                    <Link to="/admin">Admin Panel</Link>
                                    <Link to="/admin/users">Users</Link>
                                </>
                            )}

                            {/* LOGOUT */}
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
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