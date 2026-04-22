import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";   // ← adjust path to match your project

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    /* ── sample data – swap with real API data later ── */
    const stats = [
        { icon: "📋", label: "Total Tasks", value: "24", cls: "purple" },
        { icon: "🔥", label: "In Progress", value: "7", cls: "pink" },
        { icon: "✅", label: "Completed", value: "17", cls: "green" },
    ];

    const recentTasks = [
        { name: "Finalise event booking UI", due: "Today", dot: "purple" },
        { name: "Fix CORS on /api/register", due: "Tomorrow", dot: "pink" },
        { name: "Connect Redux to auth slice", due: "Fri", dot: "green" },
        { name: "Deploy backend to Render", due: "Sat", dot: "purple" },
    ];

    const progress = [
        { name: "Eventora – Frontend", pct: 72, cls: "fill-purple", w: "72%" },
        { name: "Eventora – Backend", pct: 55, cls: "fill-pink", w: "55%" },
        { name: "Auth & OTP Flow", pct: 40, cls: "fill-green", w: "40%" },
    ];

    return (
        <div className="dashboard-root">
            {/* ── ambient blobs ── */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />

            {/* ── top navigation bar ── */}
            <header className="topbar">
                <div className="logo">event<span>ora</span></div>

                <div className="topbar-actions">
                    <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                        onClick={() => navigate("/tasks")}>
                        ⚡ Tasks
                    </button>
                    <div className="avatar">AM</div>
                </div>
            </header>

            {/* ── page content ── */}
            <main className="dashboard-main">

                {/* hero */}
                <section className="hero">
                    <p className="hero-eyebrow">Your workspace</p>
                    <h1>
                        Good morning,{" "}
                        <span className="highlight">Amaan 👋</span>
                    </h1>
                    <p className="hero-sub">
                        Here's what's happening with your projects today.
                    </p>
                </section>

                {/* stat cards */}
                <div className="stats-row">
                    {stats.map((s) => (
                        <div className="stat-card" key={s.label}>
                            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* two-column section */}
                <div className="grid-2">

                    {/* recent tasks */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Recent Tasks</span>
                            <span className="card-badge">4 active</span>
                        </div>
                        <div className="task-list">
                            {recentTasks.map((t) => (
                                <div className="task-item" key={t.name}>
                                    <div className={`task-dot ${t.dot}`} />
                                    <span className="task-name">{t.name}</span>
                                    <span className="task-due">{t.due}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* project progress */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">Project Progress</span>
                        </div>
                        <div className="progress-list">
                            {progress.map((p) => (
                                <div className="progress-item" key={p.name}>
                                    <div className="progress-meta">
                                        <span className="progress-name">{p.name}</span>
                                        <span className="progress-pct">{p.pct}%</span>
                                    </div>
                                    <div className="progress-track">
                                        <div
                                            className={`progress-fill ${p.cls}`}
                                            style={{ width: p.w }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* quick actions */}
                <div className="card card-full">
                    <div className="card-header">
                        <span className="card-title">Quick Actions</span>
                    </div>
                    <div className="action-row">
                        <button className="btn btn-primary" onClick={() => navigate("/tasks")}>
                            📋 Manage Tasks
                        </button>
                        <button className="btn btn-ghost" onClick={() => navigate("/events")}>
                            🗓 View Events
                        </button>
                        <button className="btn btn-ghost" onClick={() => navigate("/profile")}>
                            👤 Profile
                        </button>
                        <button className="btn btn-danger" onClick={handleLogout}
                            style={{ marginLeft: "auto" }}>
                            🚪 Logout
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
