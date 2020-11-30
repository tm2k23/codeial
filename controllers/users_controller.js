const { response } = require('express');
const passport = require('passport');
const User = require('../models/user.js'); // import the user model

module.exports.profile = function(req, res) {
    // console.log(req.session);
    // console.log(req.user);
    User.findById(req.params.profileIdToView, function(err, user) {
        return res.render('profile.ejs', {
            title: "Profile",
            profileToView: user
        });
    })

}

module.exports.signUp = function(req, res) {
    // to render sign up page

    if (req.isAuthenticated()) { // limit this page access when already authenticated
        return res.redirect('/user/profile/' + req.user.id);
    }
    return res.render('user_sign_up.ejs', {
        title: "Sign Up"
    });
}

module.exports.signIn = function(req, res) {
    // to render sign in page

    if (req.isAuthenticated()) { // limit this page access when already authenticated
        return res.redirect('/user/profile/' + req.user.id);
    }
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
            console.log(req.body);
            User.create(req.body, function(err, user) {
                if (err) { console.log('Error in creating new user ', err); }
                console.log('new user created : ', user); // print the user data on console
                return res.redirect('/user/sign-in'); // redirect to signin page when the user is created
            });
        } else {
            // redirect back to the signup page if the user already exists
            console.log(`User ${user.email} already exists`);
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res) {
    // to start the sign in  session
    return res.redirect('/user/profile/' + req.user.id);
}

module.exports.destroySession = function(req, res) {
    // for signout 
    req.logout();
    return res.redirect('/');
}

module.exports.update = function(req, res) {
    if (req.user.id == req.params.userIdToUpdate) {
        // console.log(req.body);
        User.findByIdAndUpdate(req.params.userIdToUpdate, req.body, function(err, user) {
            // we can also write {name:req.body.name , email:req.body.email} instead of req.body
            res.redirect('back');
        })
    } else {
        return res.status(401).send('Unauthorized');
    }
}