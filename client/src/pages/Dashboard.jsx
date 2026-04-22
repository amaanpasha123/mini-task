import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <p>Welcome User 👋</p>

            <p className="role-badge" data-role={role}>
                {role === "admin" ? "🔐 Admin Account" : "👤 User Account"}
            </p>

            <div className="buttonGroup">
                <button onClick={() => navigate("/tasks")}>
                    Manage Tasks
                </button>

                {role === "admin" && (
                    <button className="admin-btn" onClick={() => navigate("/admin")}>
                        Admin Panel
                    </button>
                )}

                <button className="logout-btn-dash" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
