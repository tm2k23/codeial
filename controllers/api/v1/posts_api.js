const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "List of posts V1 Api",
        posts: posts
    })
}

module.exports.destroy = async function(req, res) {
    try {
        // console.log('destroying with api********************************');
        let post = await Post.findById(req.params.postIdToDelete);

        if (post.user == req.user.id) {
            // console.log('authorized with api********************************');
            await Comment.deleteMany({ post: req.params.postIdToDelete }, function(err) {
                post.remove();
                return res.status(200).json({
                        data: {
                            post_id: post._id
                        },
                        message: "Post Deleted Successfully"
                    })
                    // req.flash('success', 'Post and associated Comments deleted successfully');
                    // return res.redirect('back');
            })
        } else {
            return res.status(401).json({
                    message: "You cannot delete this post"
                })
                // req.flash('error', 'You cannot delete this post');
                // return res.redirect('back');
        }
    } catch (err) {
        console.log('error : ', err);
        // req.flash('error', err);
        // return res.redirect('back');
    }
}