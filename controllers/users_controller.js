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
    // todo later
    return res.end('created');
}

module.exports.createSession = function(req, res) {
    // to start the sign in  session
    // todo later
    return res.end('Session created');
}