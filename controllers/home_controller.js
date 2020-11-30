const Post = require('../models/post');
const User = require('../models/user');
/*module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // Post.find({}, function(err, posts) {
    //     return res.render('home.ejs', {
    //         title: "Home",
    //         posts: posts
    //     });
    // });

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, posts) {
            if (err) { return console.log('error is fetching posts in database ', err); }
            User.find({}, function(err, users) {
                return res.render('home.ejs', {
                    title: "Home",
                    posts: posts,
                    users: users
                })
            })

        })

}*/

module.exports.home = async function(req, res) {

    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home.ejs', {
            title: "Home",
            posts: posts,
            users: users
        });
    } catch (err) {
        console.log('Error : ', err);
    }


}