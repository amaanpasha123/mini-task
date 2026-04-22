import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 1. Not logged in
    if (!token) {
        return <Navigate to="/login" />;
    }

    // 2. Logged in but not admin
    if (role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    // 3. Admin allowed
    return children;
}

export default AdminRoute;