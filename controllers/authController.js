const generateUniqueStudentId = require('../utils/generateStudentId');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

function setUserCookies(res, user, role) {
    res.cookie('userId', user._id, { httpOnly: true });
    res.cookie('role', role, { httpOnly: true });
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (role === 'admin') {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) return res.status(400).send("Admin already exists");

            const newAdmin = new Admin({ name, email, password });
            await newAdmin.save();
            setUserCookies(res, newAdmin, 'admin');
            return res.redirect('/admin/dashboard');
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) return res.status(400).send("Student already exists");

        const id = await generateUniqueStudentId();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({ id, name, email, password: hashedPassword });
        await newStudent.save();
        const admin = await Admin.findOne({});
        if (admin) {
            await Admin.findByIdAndUpdate(admin._id, { $inc: { "stats.totalStudents": 1 } });
        }
        setUserCookies(res, newStudent, 'student');
        res.redirect('/student/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};


// Login
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const Model = role === 'admin' ? Admin : Student;

        const user = await Model.findOne({ email });
        if (!user) return res.redirect('/login');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.redirect('/login');

        setUserCookies(res, user, role);

        if (role === 'admin') return res.redirect('/admin/dashboard');
        return res.redirect('/student/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};


// Logout
exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('role');
    res.redirect('/login');
};
