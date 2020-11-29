const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes/posts');
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

module.exports.destroy = function(req, res) {
    // console.log('Request Params : ', req.params);
    // first look if the post in the database esists or not 
    Post.findById(req.params.postIdToDelete, function(err, post) {
        if (post) {
            // if the post exist , check if the post is deleted by the owner only 
            // console.log('post.user : ', post.user);
            // console.log(req.user);
            // console.log(typeof(req.user._id), " ", typeof(req.user.id));
            if (post.user == req.user.id) //if (post.user == req.user._id) why not this ?
            { // tocheck if it is deleted by the owner , check the user of the post and id of thew logged in user  
                Comment.deleteMany({ post: req.params.postIdToDelete }, function(err) {
                    // if the id matches ,  first deletre all the comments 
                    post.remove(); // and then remove the post 
                    return res.redirect('back'); // redirect back to the home page 
                })
            }
        }
    })
}