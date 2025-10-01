const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: String,
    isIssued: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    coverImage: String
});

module.exports = mongoose.model("Book", bookSchema);
