
const isSignedIn = (req, res, next) => {
    if(req.session.user) return next(); // check if the user is in session if so go to the next thing
    res.redirect('/auth/sign-in'); // if not redirect to the sign in page
};

module.exports = isSignedIn; // export fort use in server