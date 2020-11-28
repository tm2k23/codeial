const mongoose = require('mongoose'); // require mongoose

// defining the new schema
const postSchema = new mongoose.Schema({
    content: { // this is fo the content of the post
        type: String,
        required: true
    },
    user: { // this is for the user  who posted the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    // to store when was the user created and last updates we need to store the timestamps as well
    // this will creat "created at" and "updated at" for each document 
    timestamps: true
});


// tell mongoose that this is a new model or collection
const Post = mongoose.model('Post', postSchema);

// export it
module.exports = Post;