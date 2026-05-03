const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");


// create task
exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, dueDate, adminId } = req.body;

        const admin = await User.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can assign tasks" });
        }

        const task = await Task.create({
            title,
            description,
            projectId,
            assignedTo,
            dueDate
        });

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get tasks
exports.getTasks = async (req, res) => {
    try {
        const { userId, role } = req.query;

        let tasks;

        if (role === "admin") {
            tasks = await Task.find()
                .populate("assignedTo", "name")
                .populate("projectId", "title");
        } else {
            tasks = await Task.find({
                assignedTo: new mongoose.Types.ObjectId(userId)
            }).populate("projectId", "title");
        }

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status, userId } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: "Task not found" });

        // only assigned user can update
        if (task.assignedTo.toString() !== userId) {
            return res.status(403).json({ msg: "Not allowed" });
        }

        task.status = status;
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};