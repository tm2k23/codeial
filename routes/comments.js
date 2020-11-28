const express = require('express');
const passport = require('passport');
const router = express.Router(); // initialised router
const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;