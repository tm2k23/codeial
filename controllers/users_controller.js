const { response } = require('express');
const User = require('../models/user.js'); // import the user model

module.exports.profile = function(req, res) {
    if (req.cookies.user_id) {
        // if user_id cookies exist
        User.findById(req.cookies.user_id, function(err, user) { // find the user by id

            // if user is found
            if (user) {
                return res.render('user_profile', {
                    title: user.eventNames,
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
            }

            // if user is not found redirect to the sign-in page
            else
                return res.redirect('/user/sign-in');
        })
    }

    // if user_id cookies does not exist
    else
        return res.redirect('/user/sign-in');
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

    // find the user 
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) { console.log('Error in seraching the signup email in database ', err); } // if there is error

        // handle user found 
        if (user) {
            // handle passwords which do not match, send it back to the signin page
            if (user.password != req.body.password)
                return res.redirect('back');

            // handle session creation
            res.cookie('user_id', user.id); // creat cookie
            return res.redirect('/user/profile'); // redirect to the users profile page
        }

        // handle user not found., send it back to the signin page
        else
            return res.redirect('back');
    });
}