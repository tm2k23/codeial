const express = require('express'); // to use express module require express
const app = express(); // now app contain all the functionalities of express
const port = 8000; // define the port
const expressLayouts = require('express-ejs-layouts'); // require express-ejs-layouts for using layouts\
const db = require('./config/mongoose'); // requiring the config b/w mongo and mongodb

//setting up the view engine
app.set('view engine', 'ejs'); // defining the view engine
app.set('views', './views'); // setting the views path

// extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts); // middleware for express layouts 
app.use(express.static('./assets')); // middleware for static files

app.use('/', require('./routes/index')); // defining the router

// listening to the port 8000
app.listen(port, function(err) {
    // on error
    if (err) {
        console.log(`error in starting the server : ${err}`);
    }

    // on successful starting of the server
    else {
        console.log(`Server running at port : ${port}`);
    }
});