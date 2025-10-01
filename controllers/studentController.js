const Student = require("../models/Student");
const Request = require("../models/Request");

exports.dashboard = async (req, res) => {
    try {
        if (!req.user || req.role !== 'student') {
            return res.redirect('/admin/dashboard');  // redirect to admin dashboard if not a student
        }
        res.render("student/dashboard", { student: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.render("student/requestBook", { requests,
             student: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.profile = async (req, res) => {
    try {
        res.render("student/profile", { student: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
