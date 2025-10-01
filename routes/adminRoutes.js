const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const adminController = require("../controllers/adminController");
const checkUserRole = require("../middleware/confirmAdmin");

router.get("/dashboard", isLoggedIn, checkUserRole, (req, res) => {
    res.render("admin/dashboard", { admin: req.user, stats: req.user.stats });
});

router.get("/books", isLoggedIn, checkUserRole, adminController.getBooks);

router.get("/students", isLoggedIn, checkUserRole, adminController.getStudents);

router.get("/issue", isLoggedIn, checkUserRole, adminController.getIssuedBooks);

module.exports = router;