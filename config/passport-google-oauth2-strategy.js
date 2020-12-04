// require the passport library
const passport = require('passport');

// require passport-local
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
// require the user model
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "643913354712-oecjo76ho0873ecuadl0pdutta6li78i.apps.googleusercontent.com",
    clientSecret: "Hlv3L8IyURfAhc3Rq4-tMNAv",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).exec(
        function(err, user) {
            if (err) { console.log(err); return; }
            // console.log(profile);
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                        // avatar: profile.photos[0].value
                }, function(err, user) {
                    if (err) { console.log(err); }
                    return done(null, user);
                })
            }
        }
    )
}))

module.exports = passport;