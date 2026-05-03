const express = require("express");
const router = express.Router();
const {
    createProject,
    getProjects,
    getUserProjects
} = require("../controllers/projectController");

router.post("/create", createProject);
router.get("/", getProjects);
router.get("/user/:userId", getUserProjects);

module.exports = router;