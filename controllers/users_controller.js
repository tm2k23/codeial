const { response } = require('express');
const passport = require('passport');
const User = require('../models/user.js'); // import the user model
const path = require('path');
const fs = require('fs');
module.exports.profile = function(req, res) {
    // console.log(req.session);
    // console.log(req.user);
    // console.log('request came to display the profile page');
    User.findById(req.params.profileIdToView, function(err, user) {
        // console.log('Going to render the profile page');
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
    // console.log('Request came to sign in');
    req.flash('success', 'Logged in successfully');
    // console.log('Flash message is set inside the controller');
    return res.redirect('/user/profile/' + req.user.id);
}

module.exports.destroySession = function(req, res) {
    // for signout 
    req.logout();
    req.flash('success', 'Logged out successfully');
    return res.redirect('/');
}

module.exports.update = async function(req, res) {
    // if (req.user.id == req.params.userIdToUpdate) {
    //     // console.log(req.body);
    //     User.findByIdAndUpdate(req.params.userIdToUpdate, req.body, function(err, user) {
    //         // we can also write {name:req.body.name , email:req.body.email} instead of req.body
    //         req.flash('success', 'Profile updated Successfully');
    //         res.redirect('back');
    //     })
    // } else {
    //     req.flash('failure', 'Unauthorized');
    //     return res.redirect('back');
    // }
    if (req.user.id == req.params.userIdToUpdate) {
        try {
            let user = await User.findById(req.params.userIdToUpdate);
            User.uploadedAvatar(req, res, function(err) {
                if (err) { console.log('multer error ********************* '); }
                // console.log(req.file);
                // console.log(req.body);
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        } catch (err) { console.log(err); }
    } else {
        req.flash('failure', 'Unauthorized');
        return res.redirect('back');
    }
}