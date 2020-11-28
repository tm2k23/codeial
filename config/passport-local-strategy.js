// require the passport library
const passport = require('passport');

// require passport-local
const LocalStrategy = require('passport-local');

// require the user model
const User = require('../models/user');

// now we need to tell the passport to use the new local strategy created

// for signin
passport.use(new LocalStrategy({
        usernameField: 'email', // this is the username field and will be unique for every user  
        passwordField: 'password' // defining the password field for local strategy
    },
    // defining the callback function which have email password and done in its argument 
    // done is the callback function which reports back to the passport.js
    function(email, password, done) {
        // find the user and establish the identity
        User.findOne({ email: email }, function(err, user) {

            if (err) { // if errror in finding the user 
                console.log('Error in finding user -> passport');
                return done(err); //  this statemtn will report the error to passport
            }

            // if user not found or password does not match
            if (!user || user.password != password) {
                console.log('Invalid username / password');
                // done is the callback function which reports back to the passport.js
                return done(err, false); // done function accepts 2 arguments 
                // here false tells the passport that authentication is not done 
            }

            // if the user is found and tyhe password is correct
            return done(null, user); //  sending that there is no error and also sending the user detail to passport

        })
    }
));

// now we need to serialise and deserialise the user 

// serialise means add key to cookie
passport.serializeUser(function(user, done) {
    // callback function
    // console.log(user.id);
    done(null, user.id); // this tells the passport that set user.id as the key in cookie
    // it will be automatically encrypted by the passport
});

// deserialize means find the id(from cookie) in the database when rqst comes from the browseer
// deserialize the user forom the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) { // if errror in finding the user 
            console.log('Error in finding user -> passport');
            return done(err); //  this statemtn will report the error to passport
        }

        // done is the callback function which reports back to the passport.js
        return done(null, user); // send no error and the user of that key
    });
});

// check if the user is autheticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) { // if user is signed in
        return next(); // pass to next function i.e. controllers action
    }

    // if user not signed in
    return res.redirect('/user/sign-in');

}

// set the authenticates user
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        // req.user contains the current signedin user from cookies 
        // we are just sending it to locals for views  
    }
    next();
}

// now we need to export the passport
module.exports = passport;