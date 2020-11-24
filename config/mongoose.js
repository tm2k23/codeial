const mongoose = require('mongoose');

// provide connection to database ie.e connect mongoose to mongodb
mongoose.connect('mongodb://localhost/codeial_development');

// verifying if the connection is established or not
const db = mongoose.connection; // now this db is the connection betweendatabase and mongoose
db.on('error', console.error.bind(console, 'Error in connecting to database')); // if there is an error
db.once('open', function() {
    // on successful connection to database
    console.log('Successfully connected to database');
})