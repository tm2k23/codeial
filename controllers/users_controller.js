const { response } = require('express');
const User = require('../models/user.js'); // import the user model

module.exports.profile = function(req, res) {
    return res.render('profile.ejs', {
        title: "Profile"
    });
}

module.exports.signUp = function(req, res) {
    // to render sign up page
    return res.render('user_sign_up.ejs', {
        title: "Sign Up"
    });
}

module.exports.signIn = function(req, res) {
    // to render sign in page
    return res.render('user_sign_in.ejs', {
        title: "Sign In"
    });
}

module.exports.create = function(req, res) {
    // to add user to the data base 

    if (req.body.password != req.body.confirm_password) // if the password does not match
        return res.redirect('back'); // redirect back to the signup page

    // check if the user email already exists
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('Error in seraching the signup email in database ', err); } // if there is error

        if (!user) {
            // if user does not exist
            User.create(req.body, function(err, user) {
                if (err) { console.log('Error in creating new user ', err); }
                console.log('new user created : ', user); // print the user data on console
                return res.redirect('/user/sign-in'); // redirect to signin page when the user is created
            });
        } else {
            console.log('User already exists');
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res) {
    // to start the sign in  session
    // todo later
    return res.end('Session created');
}