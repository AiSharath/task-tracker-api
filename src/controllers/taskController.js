const mongoose = require("mongoose")
const Task = require("../models/Task")

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({ message: "Title is required" })
        }

        const task = await Task.create({
            title,
            description,
            userId: req.user.id
        })

        res.status(201).json(task)
    } catch (error) {
        console.error("createTask error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const getTasks = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const tasks = await Task.find().populate("userId", "email")
            return res.json(tasks)
        }

        const tasks = await Task.find({ userId: req.user.id })
        res.json(tasks)
    } catch (error) {
        console.error("getTasks error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" })
        }

        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (task.userId.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" })
        }

        // Whitelist only safe fields
        const { title, description, status } = req.body
        const updated = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        )

        res.json(updated)
    } catch (error) {
        console.error("updateTask error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" })
        }

        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        if (task.userId.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" })
        }

        await Task.findByIdAndDelete(id)
        res.json({ message: "Task deleted" })
    } catch (error) {
        console.error("deleteTask error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}