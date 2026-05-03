const Task = require("../models/Task");


exports.getDashboard = async (req, res) => {
    try {
        const { userId, role } = req.query;

        let tasks;

        if (role === "admin") {
            tasks = await Task.find();
        } else {
            tasks = await Task.find({ assignedTo: userId });
        }

        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const pending = tasks.filter(t => t.status !== "completed").length;

        const overdue = tasks.filter(
            t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed"
        ).length;

        res.json({ total, completed, pending, overdue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};