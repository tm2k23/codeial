const express = require('express'); // to use express module require express
const app = express(); // now app contain all the functionalities of express
const port = 8000; // define the port
const expressLayouts = require('express-ejs-layouts'); // require express-ejs-layouts for using layouts\
const db = require('./config/mongoose'); // requiring the config b/w mongo and mongodb
const cookieParser = require('cookie-parser'); // require cookie parser
const session = require('express-session'); // require express session
const passport = require('passport'); // require passport
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); // require connecct mongo for session cookies , it takes argument about what to store
const sassMiddleware = require('node-sass-middleware'); // middleware for sass files to convert to css
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const multer = require('multer'); // require multer for file upload 
const passportJWT = require('./config/passport-jwt-strategy');
const jwt = require('jsonwebtoken');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const nodemailer = require("nodemailer");


app.use('/uploads', express.static(__dirname + '/uploads'));

//setting up the view engine
app.set('view engine', 'ejs'); // defining the view engine
app.set('views', './views'); // setting the views path

// extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(sassMiddleware({ //middleware for sass -> css
    src: './assets/scss', // path of scss file
    dest: './assets/css', // destination of scss->css file
    // debug: true, // debug will be false in production mode
    outputStyle: 'extended', //output style is extended
    prefix: '/css'
}))
app.use(expressLayouts); // middleware for express layouts 
app.use(express.static('./assets')); // middleware for static files
app.use(express.urlencoded()); // url parser
app.use(cookieParser()); // middleware for parsing cookies
app.use(session({ // middleware for cookie encryption
    name: 'codeial', // name of the cookie
    // TODO change the secret while production
    secret: 'tejas@2000',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // mongostore is used to store the session cookies in the db
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err) { // callback function 
        console.log(err || 'connect mongodb setup ok')
    })
}));
// now tell app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

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