import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await api.get("/admin/users");
            setCount(res.data.length);
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>

            <h3>Total Users: {count}</h3>

            <Link to="/admin/users">
                <button style={{ marginTop: "10px" }}>
                    Manage Users
                </button>
            </Link>
        </div>
    );
}

export default AdminDashboard;