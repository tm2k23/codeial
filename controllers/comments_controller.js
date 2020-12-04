const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
/*comment create contoller without async await 
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
}*/

// comment create controller with async await
module.exports.create = async function(req, res) {
    try {
        // console.log('request came');
        // console.log(req.body);
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            if (req.xhr) {
                // console.log('its a xhr request');
                // console.log(comment);
                // console.log(comment);
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Added Successfully"
                });
            }
            req.flash('success', 'Comment added Successfully');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

/*comment destroy contoller without async await
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
}*/

// comment destroy controller with async await
module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.commentIdToDelete);
        let post = await Post.findById(comment.post);
        if (req.user.id == comment.user || req.user.id == post.user) {
            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.commentIdToDelete } });
            comment.remove();
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: comment.id
                    },
                    message: "Comment Deleted"
                })
            }
            req.flash('success', 'Comment deleted Successfully');
            res.redirect('back');
        } else {
            req.flash('error', 'You cant delete this comment');
            res.redirect('back');

        }
    } catch (err) {
        console.log('error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}