import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { FaTasks, FaSignOutAlt } from "react-icons/fa"
import "./Dashboard.css"

function getCookie(name) {
    const value = document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1]
    return value
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0`
}

function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [activeTab, setActiveTab] = useState("tasks")
    const navigate = useNavigate()

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const token = getCookie("token")
            const res = await fetch("http://localhost:5000/api/tasks", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            setTasks(data)
        } catch (error) {
            console.log("Error fetching tasks:", error)
        }
    }

    const handleSignOut = () => {
        deleteCookie("token")
        navigate("/")
    }

    const pendingTasks = tasks.filter(t => t.status === "pending")
    const completedTasks = tasks.filter(t => t.status === "completed")

    return (
        <div className="db-layout">

            {/* SIDEBAR */}
            <div className="db-sidebar">
                <div className="db-logo">TaskFlow</div>
                <nav className="db-nav">
                    <div
                        className={`db-nav-item ${activeTab === "overview" ? "active" : ""}`}
                        onClick={() => setActiveTab("overview")}
                    >
                        <MdDashboard size={18} />
                        <span>Overview</span>
                    </div>
                    <div
                        className={`db-nav-item ${activeTab === "tasks" ? "active" : ""}`}
                        onClick={() => setActiveTab("tasks")}
                    >
                        <FaTasks size={16} />
                        <span>Tasks</span>
                    </div>
                </nav>
                <div className="db-signout" onClick={handleSignOut}>
                    <FaSignOutAlt size={16} />
                    <span>Sign out</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="db-main">
                {activeTab === "tasks" && (
                    <>
                        <div className="db-header">
                            <div>
                                <h2>Tasks</h2>
                                <p>{pendingTasks.length} active, {completedTasks.length} completed</p>
                            </div>
                            <button onClick={() => navigate("/tasks/create")}>+ Add task</button>
                        </div>

                        {/* TO DO */}
                        <div className="db-section">
                            <h4>To Do</h4>
                            {pendingTasks.length === 0 ? (
                                <p className="db-empty">No pending tasks</p>
                            ) : (
                                pendingTasks.map(task => (
                                    <div key={task._id} className="db-task-row">
                                        <div className="db-task-left">
                                            <input type="checkbox" disabled />
                                            <span>{task.title}</span>
                                        </div>
                                        <div className="db-task-right">
                                            <span className="db-badge pending">pending</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* COMPLETED */}
                        <div className="db-section">
                            <h4>Completed</h4>
                            {completedTasks.length === 0 ? (
                                <p className="db-empty">No completed tasks</p>
                            ) : (
                                completedTasks.map(task => (
                                    <div key={task._id} className="db-task-row completed">
                                        <div className="db-task-left">
                                            <input type="checkbox" checked readOnly />
                                            <span>{task.title}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === "overview" && (
                    <>
                        <div className="db-header">
                            <div>
                                <h2>Overview</h2>
                                <p>Your task summary</p>
                            </div>
                        </div>
                        <div className="db-stats">
                            <div className="db-stat-card">
                                <h3>{tasks.length}</h3>
                                <p>Total Tasks</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{pendingTasks.length}</h3>
                                <p>Pending</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{tasks.filter(t => t.status === "assigned").length}</h3>
                                <p>Assigned</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{completedTasks.length}</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Dashboard