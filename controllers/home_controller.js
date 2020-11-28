const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // Post.find({}, function(err, posts) {
    //     return res.render('home.ejs', {
    //         title: "Home",
    //         posts: posts
    //     });
    // });

    Post.find({}).populate('user').exec(function(err, posts) {
        if (err) { return console.log('error is fetching posts in database ', err); }
        return res.render('home.ejs', {
            title: "Home",
            posts: posts
        })
    })

}