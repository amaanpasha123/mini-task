import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Tasks.css";

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

            setFormData({ title: "", description: "" });
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
            await api.put(`/tasks/${id}`, { status: "completed" });
            setMessage("Task completed");
            fetchTasks();
        } catch (error) {
            setMessage("Update failed");
        }
    };

    // Edit Task
    const handleEdit = (task) => {
        setFormData({ title: task.title, description: task.description });
        setEditId(task._id);
    };

    return (
        <div className="tasks-container">
            <div className="tasks-inner">
                <h1 className="tasks-heading">Task Manager</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="tasks-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="tasks-input"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Enter task description"
                        value={formData.description}
                        onChange={handleChange}
                        className="tasks-input"
                    />

                    <button type="submit" className="tasks-add-btn">
                        {editId ? "Update Task" : "Add Task"}
                    </button>
                </form>

                {message && <p className="tasks-message">{message}</p>}

                {/* Tasks */}
                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <p className="tasks-empty">No tasks found</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task._id} className="task-card">
                                <div>
                                    <h3 className="task-title">{task.title}</h3>
                                    <p className="task-desc">{task.description}</p>
                                    <p className="task-status">
                                        Status:{" "}
                                        <span className={`task-status-value ${task.status}`}>
                                            {task.status}
                                        </span>
                                    </p>
                                </div>

                                <div className="task-btn-group">
                                    <button className="task-btn edit" onClick={() => handleEdit(task)}>
                                        Edit
                                    </button>

                                    <button className="task-btn complete" onClick={() => handleComplete(task._id)}>
                                        Complete
                                    </button>

                                    <button className="task-btn delete" onClick={() => handleDelete(task._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks;
