
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const isLoggedIn = require("../middleware/isLoggedIn");
const checkStudentRole = require("../middleware/confirmStudent");

// Dashboard (protected)
router.get("/dashboard", isLoggedIn, checkStudentRole, studentController.dashboard);

// Request Book (protected)
router.get("/request", isLoggedIn, checkStudentRole, studentController.getRequests);

// Profile (protected)
router.get("/profile", isLoggedIn, checkStudentRole, studentController.profile);

module.exports = router;
