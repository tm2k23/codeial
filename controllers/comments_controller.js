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

module.exports.destroy = function(req, res) {
    // console.log('id of comment to delete : ', req.params.commentIdToDelete);
    Comment.findById(req.params.commentIdToDelete, function(err, comment) {
        // console.log('comment is related to the post with ID : ', comment.post);
        // console.log('Owner of the comment is  : ', comment.user);
        Post.findById(comment.post, function(err, post) {
            if (req.user.id == comment.user || req.user.id == post.user) { //if (req.user.id == comment.user) {
                Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.commentIdToDelete } }, function(err, post) {
                    // console.log('Owner of the post is : ', post.user);
                    comment.remove();
                    res.redirect('back');
                })
            }
        })
    })
}