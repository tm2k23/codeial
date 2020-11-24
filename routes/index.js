/* ********************************************************
***********************************************************
this is the index route file or the basr route , 
all further routes will be directed from here .
***********************************************************
************************************************************/

const express = require('express'); // require express
const router = express.Router(); // initialised router

console.log('connected to the router'); // message when connected to the router

// this is the home route as well , so we will render the home page from here 
// first we need to require the controller 
const homeController = require('../controllers/home_controller'); // require the controller
router.get('/', homeController.home); // using the controller

// this is another router
// this is for the route /user , for this route, index router will direct to the users.js router file
router.use('/user', require('./users'));

module.exports = router; // export will be used in parent index.js file to define router