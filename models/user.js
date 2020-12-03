const mongoose = require('mongoose'); // require mongoose
const multer = require('multer');
const path = require('path'); // used for converting the path to string
const AVATAR_PATH = path.join('/uploads/users/avatars');
// creat a new schema
const userSchema = new mongoose.Schema({
    email: {
        // this is for email
        type: String,
        required: true,
        unique: true // this will make every email ids unique
    },
    password: {
        // this is for password
        type: String,
        required: true
    },
    name: {
        // this is for name of the user 
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    // to store when was the user created and last updates we need to store the timestamps as well
    // this will creat "created at" and "updated at" for each document 
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// tell mongoose that this is a new model or collection
const User = mongoose.model('User', userSchema);

// export it
module.exports = User;