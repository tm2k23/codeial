const express = require('express');
const passport = require('passport');
const router = express.Router(); // initialised router
const commentsController = require('../controllers/comments_controller');
const { route } = require('./posts');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:commentIdToDelete', passport.checkAuthentication, commentsController.destroy);

module.exports = router;