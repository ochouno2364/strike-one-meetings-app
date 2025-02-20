// Dependencies 

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js'); // import user model 

/// AUTH ROUTES 


// SIGN UP ROUTE
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs') // This route sends users to the sign-up view
});

// SIGN IN ROUTE
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs') // This route sends users to the sign-in view
});

// CREATE USER ROUTE
router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username }); // find a user in the data base by there username
    if(userInDatabase) { // if a user already exits with tht name 
        return res.send('Username taken!'); // tell the user trying to crete an account that the user name is taken
    }
    if (req.body.password !== req.body.confirmPassword) { //make sure that password and the confirm passwords match
        return res.send('Passwords MUST match!'); // If they dont match tell the user
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // user bycrypt to hash the password
    req.body.password = hashedPassword; // set the the password to the hased pashed words value
    const user = await User.create(req.body); // create the user
    res.send(`Welcome to the Team ${user.username}` ); 
});


// SIGN IN A USER ROUTE
router.post('/sign-in', async (req, res) => {
    const userInDatabase = await User.findOne({username: req.body.username});
    if(!userInDatabase) {
        return res.send('Log in failed. Try Again!');
    }
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if(!validPassword) {
        return res.send('Log in failed. Try Again!');
    }
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    };

    res.redirect('/');
});
module.exports = router; // Exporting my router