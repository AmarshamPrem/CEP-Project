const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    bookId: String,
    bookTitle: String,
    issueDate: { type: Date, default: Date.now },
    returned: { type: Boolean, default: false }
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema);
