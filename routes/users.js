/* ********************************************************
***********************************************************
this is the user router .... 
on hitting the router /user , 
index router will direct to this router 
***********************************************************
************************************************************/

const express = require('express'); // required express
const passport = require('passport');
const router = express.Router(); // initialised router

/* Now we need to use the controller for this route 
for that first we need to require the controller */
const usersController = require('../controllers/users_controller');
router.get('/profile/:profileIdToView', passport.checkAuthentication, usersController.profile); // for profile
router.get('/sign-up', usersController.signUp); // for sign up page
router.get('/sign-in', usersController.signIn); // for sign in page
router.post('/create', usersController.create); // for adding user to the database action route of signup form
router.get('/sign-out', usersController.destroySession); // for ending the session of the loggedin user
router.post('/update/:userIdToUpdate', usersController.update); // see what will happen if we use get for this route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/sign-in' }), usersController.createSession);
// action route for sign in form 
// authenticate using passport-local strategy
// if failure , redirect else go to controller
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/user/sign-in' }
), usersController.createSession); // action route for sign in form

module.exports = router; // export is used in index.js router file