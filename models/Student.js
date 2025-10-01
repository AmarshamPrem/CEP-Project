const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    booksRead: { type: Number, default: 0 },
    targetBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    booksIssued: [
        {
            bookId: String,
            title: String,
            issueDate: Date,
            returned: { type: Boolean, default: false }
        }
    ],
    history: [
        {
            bookId: String,
            title: String,
            issueDate: Date,
            returnDate: Date
        }
    ]
});

module.exports = mongoose.model("Student", studentSchema);
