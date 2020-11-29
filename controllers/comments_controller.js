const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res) {
    // console.log('comment request body is', req.body);
    // console.log('user who made the comment is ', req.user);
    // return res.redirect('back');
    Post.findById(req.body.post, function(err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // console.log(comment);
                post.comments.push(comment);
                post.save();
                // console.log(post.comments);
                res.redirect('/');
            })
        }
    })
}