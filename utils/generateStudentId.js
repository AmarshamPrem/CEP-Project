const Student = require('../models/Student');

// Generate random 6-character alphanumeric ID
function randomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'AS';
    for (let i = 0; i < 4; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Ensure uniqueness in DB
async function generateUniqueStudentId() {
    let unique = false;
    let newId;

    while (!unique) {
        newId = randomId();
        const exists = await Student.findOne({ studentId: newId });
        if (!exists) unique = true;
    }

    return newId;
}

module.exports = generateUniqueStudentId;
