const Comment = require('../models/comment');
const Post = require('../models/post');

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
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    } catch (err) {
        console.log('error : ', err);
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
            res.redirect('back');
        }
    } catch (err) {
        console.log('error', err);
    }
}