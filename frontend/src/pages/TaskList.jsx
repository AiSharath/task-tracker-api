import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./TaskList.css"

function getCookie(name) {
    const value = document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1]
    return value
}

function TaskList() {
    const [tasks, setTasks] = useState([])  // ← Bug 1: was "task" not "tasks"
    const navigate = useNavigate()

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {  // ← Bug 2: no "e" parameter needed
        try {
            const token = getCookie("token")
            const res = await fetch("http://localhost:5000/api/tasks", {
                headers: {                              // ← Bug 3: was "header" not "headers"
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
            setTasks(data)
        } catch (error) {
            console.log("Error fetching tasks:", error)
        }
    }

    const takeTask = async (taskId) => {  // ← Bug 4: was "taskTask" not "takeTask"
        try {
            const token = getCookie("token")
            const res = await fetch(`http://localhost:5000/api/tasks/${taskId}/take`, {  // ← Bug 5: wrong URL
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (res.ok) {
                fetchTasks()
            }
        } catch (error) {
            console.log("Error taking task:", error)
        }
    }

    return (
        <>
            <div className="tasklist-container">
                <div className="tasklist-header"> 
                    <h2>Available Tasks</h2>
                    <div className="header-buttons">
                        <button onClick={() => navigate("/tasks/create")}>Add Tasks</button>
                        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                    </div>
                </div>
                <div className="tasks-grid">
                    {tasks.map(task => (
                        <div key={task._id} className={`task-card ${task.status === "assigned" ? "assigned" : ""}`}> 
                            <div className="task-top">
                                <h4>{task.title}</h4>
                                <span className={`status ${task.status}`}>{task.status}</span>  
                            </div>
                            <p>{task.description}</p>
                            <div className="task-bottom">
                                <span className="due-date">{task.dueDate?new Date(task.dueDate).toLocaleDateString():"No due date"}</span>
                                {task.status === "pending" && ( 
                                    <button onClick={() => takeTask(task._id)}>Take Task</button>
                                )}
                                {task.status === "assigned" && (
                                    <span className="assigned-to">Assigned</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TaskList