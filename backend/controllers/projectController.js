const Project = require("../models/Project");
const User = require("../models/User");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
    try {
        const { title, description, members, adminId } = req.body;

        // check admin
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can create project" });
        }

        const project = await Project.create({
            title,
            description,
            members,
            createdBy: adminId
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

exports.getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;

        const projects = await Project.find({
            members: userId
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};