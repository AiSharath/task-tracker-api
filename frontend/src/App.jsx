import React from "react"
import {Routes,Route} from "react-router-dom"
import Home from "./Home.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import CreateTask from "./pages/CreateTask.jsx"
import TaskList from "./pages/TaskList.jsx"
import Dashboard from "./pages/Dashboard.jsx"


function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tasks" element={<TaskList/>}/>
                <Route path="/tasks/create" element={<CreateTask/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </>
    )
}

export default App;