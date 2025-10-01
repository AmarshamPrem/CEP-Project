const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();
connectDB();

const app = express();


app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || "library_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/admin", require("./routes/adminRoutes.js"));
app.use("/student", require("./routes/studentRoutes.js"));
app.use("/", require("./routes/authRoutes.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));