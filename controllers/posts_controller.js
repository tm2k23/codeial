const Post = require('../models/post');
const Comment = require('../models/comment');
const { post } = require('../routes/posts');

//create controller without using async await
module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if (err) {
            console.log('error is adding post to the database');
            req.flash('error', err);
        }
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created"
            });
        }
        req.flash('success', 'Posted Successfully');
        return res.redirect('back');
    });
}

/* create post controller using async await
module.exports.create = async function(req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    } catch (err) {
        console.log('Error : ', err);
    }
} */

// post destroy controller without async await
/*module.exports.destroy = function(req, res) {
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
}*/

// post destroy controller using async await
module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.postIdToDelete);
        if (post) {
            await Comment.deleteMany({ post: req.params.postIdToDelete }, function(err) {
                post.remove();
                req.flash('success', 'Post and associated Comments deleted successfully');
                return res.redirect('back');
            })
        } else {
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error : ', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}