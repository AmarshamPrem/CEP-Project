const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    studentId: String,
    bookId: String,
    bookTitle: String,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
});

module.exports = mongoose.model("Request", requestSchema);
