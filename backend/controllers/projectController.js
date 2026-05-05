const Project = require("../models/Project");
const User = require("../models/User");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
    try {
        const { title, users, adminId } = req.body;

        const project = await Project.create({
            title,
            users,
            adminId   // ✅ IMPORTANT
        });

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("members", "name email")
            .populate("createdBy", "name");

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("users", "name");

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const { adminId } = req.query;

        const projects = await Project.find({ adminId });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;

        const projects = await Project.find({
            users: userId
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
