const Student = require('../models/Student');
const Admin = require('../models/Admin');

// Middleware to check if user is logged in and attach user to req
module.exports = async function isLoggedIn(req, res, next) {
    try {
        const userId = req.cookies.userId;
        const role = req.cookies.role;
        if (!userId || !role) {
            return res.redirect('/login');
        }
        let user;
        if (role === 'admin') {
            user = await Admin.findById(userId);
        } else {
            user = await Student.findById(userId);
        }
        if (!user) {
            res.clearCookie('userId');
            res.clearCookie('role');
            return res.redirect('/login');
        }
        req.user = user;
        req.role = role;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Authentication error');
    }
};
