const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaType.ObjectId
    },
    likeable: {
        type: mongoose.SchemaType.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    // to store when was the user created and last updates we need to store the timestamps as well
    // this will creat "created at" and "updated at" for each document 
    timestamps: true
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;