import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h1>Dashboard</h1>
            <p>Welcome User 👋</p>

            <div style={styles.buttonGroup}>
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

const styles = {
    container: {
        textAlign: "center",
        marginTop: "80px"
    },

    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px"
    }
};

export default Dashboard;