import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    // fetch all users
    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // delete user
    const deleteUser = async (id) => {
        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers(); // refresh list
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin - Users Management</h2>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            border: "1px solid #ccc",
                            margin: "10px 0",
                            padding: "10px",
                            borderRadius: "8px"
                        }}
                    >
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Role:</b> {user.role}</p>

                        <button
                            onClick={() => deleteUser(user._id)}
                            style={{
                                background: "red",
                                color: "white",
                                padding: "5px 10px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Delete User
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminUsers;