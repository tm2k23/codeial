const mongoose = require('mongoose'); // require mongoose

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
    }
}, {
    // to store when was the user created and last updates we need to store the timestamps as well
    // this will creat "created at" and "updated at" for each document 
    timestamps: true
});

// tell mongoose that this is a new model or collection
const User = mongoose.model('User', userSchema);

// export it
module.exports = User;