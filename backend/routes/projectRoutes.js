const express = require("express");
const router = express.Router();

const {
    createProject,
    getProjectById,
    getAllProjects,
} = require("../controllers/projectController");


router.post("/create", createProject);
router.get("/", getAllProjects);
router.get("/user/:userId", getUserProjects);
router.get("/:id", getProjectById);

module.exports = router;