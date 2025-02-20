
const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null; // setting the locals user to equal the session user
    next(); // pass user to the next view
};

module.exports = passUserToView; //export for use in server