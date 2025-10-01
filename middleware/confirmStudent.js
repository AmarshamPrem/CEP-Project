function confirmStudent(req, res, next) {
    if (!req.user || req.role !== 'student') {
        return res.status(403).redirect('/login');
    }
    next()
}

module.exports = confirmStudent;