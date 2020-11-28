const Post = require('../models/post');
module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if (err) {
            console.log('error is adding post to the database');
        }
        return res.redirect('back');
    });
}