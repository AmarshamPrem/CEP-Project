const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

// Home
router.get("/", isLoggedIn, (req, res) => {
    if (req.role === 'admin') {
        return res.render('admin/adminLanding.ejs');
    } else if (req.role === 'student') {
        return res.render('student/studentLanding.ejs', { student: req.user });
    }
})

// Register
router.get('/register', (req, res) => res.render('auth/auth', {title:"Register"}));
router.post('/register', authController.register);

// Login
router.get('/login', (req, res) => res.render('auth/auth', {title:"Login"}));
router.post('/login', authController.login);

router.get("/logout", authController.logout);
    
module.exports = router;
