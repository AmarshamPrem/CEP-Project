function confirmAdmin(req, res, next) {
    if (!req.user || req.role !== 'admin') {
        return res.status(403).redirect('/login');
    }
    next();
}

module.exports = confirmAdmin;