import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <p>Welcome User 👋</p>

            <div className="buttonGroup">
                <button onClick={() => navigate("/tasks")}>
                    Manage Tasks
                </button>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
