const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const { getProjectById } = require("../controllers/projectController");

router.post("/create", createProject);

router.get("/:id", getProjectById);

router.get("/", getAllProjects);

router.get("/user/:userId", getUserProjects);

module.exports = router;