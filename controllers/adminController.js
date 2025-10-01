const Book = require("../models/Book");
const Student = require("../models/Student");
const IssuedBook = require("../models/IssuedBook");

exports.dashboard = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const issuedBooks = await IssuedBook.countDocuments({ returned: false });
        const totalStudents = await Student.countDocuments();

        res.render("admin/dashboard", {
            stats: { totalBooks, issuedBooks, totalStudents }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().limit(12);
        res.render("admin/books", { books });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.render("admin/students", { students });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await IssuedBook.find();
        res.render("admin/issueBook", { issuedBooks });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
