module.exports.profile = function(req, res) {
    return res.render('profile.ejs', {
        title: "Profile"
    });
}