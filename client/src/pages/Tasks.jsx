import { useState, useEffect } from "react";
import api from "../services/api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [editId, setEditId] = useState(null);

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            setMessage("Failed to load tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add / Update Task
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await api.put(`/tasks/${editId}`, formData);
                setMessage("Task updated successfully");
            } else {
                await api.post("/tasks", formData);
                setMessage("Task added successfully");
            }

            setFormData({
                title: "",
                description: ""
            });

            setEditId(null);
            fetchTasks();

        } catch (error) {
            setMessage("Something went wrong");
        }
    };

    // Delete Task
    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setMessage("Task deleted");
            fetchTasks();
        } catch (error) {
            setMessage("Delete failed");
        }
    };

    // Mark Completed
    const handleComplete = async (id) => {
        try {
            await api.put(`/tasks/${id}`, {
                status: "completed"
            });

            setMessage("Task completed");
            fetchTasks();

        } catch (error) {
            setMessage("Update failed");
        }
    };

    // Edit Task
    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description
        });

        setEditId(task._id);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Task Manager</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.addBtn}>
                    {editId ? "Update Task" : "Add Task"}
                </button>
            </form>

            {message && <p style={styles.message}>{message}</p>}

            {/* Tasks */}
            <div style={styles.taskList}>
                {tasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id} style={styles.card}>
                            <div>
                                <h3 style={styles.title}>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>
                                    Status:{" "}
                                    <span
                                        style={{
                                            color:
                                                task.status === "completed"
                                                    ? "green"
                                                    : "orange",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {task.status}
                                    </span>
                                </p>
                            </div>

                            <div style={styles.btnGroup}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => handleEdit(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.completeBtn}
                                    onClick={() => handleComplete(task._id)}
                                >
                                    Complete
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: "700px",
        margin: "40px auto",
        fontFamily: "Arial"
    },

    heading: {
        textAlign: "center",
        marginBottom: "25px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px"
    },

    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    },

    addBtn: {
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    },

    message: {
        textAlign: "center",
        color: "green",
        marginBottom: "20px"
    },

    taskList: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    card: {
        border: "1px solid #ddd",
        padding: "18px",
        borderRadius: "10px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)"
    },

    title: {
        marginBottom: "8px"
    },

    btnGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "15px",
        flexWrap: "wrap"
    },

    editBtn: {
        padding: "8px 14px",
        background: "#f59e0b",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    },

    completeBtn: {
        padding: "8px 14px",
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    },

    deleteBtn: {
        padding: "8px 14px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }
};

export default Tasks;