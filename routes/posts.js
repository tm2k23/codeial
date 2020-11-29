const express = require('express');
const passport = require('passport');
const router = express.Router(); // initialised router
const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);
router.get('/destroy/:postIdToDelete', passport.checkAuthentication, postsController.destroy);

module.exports = router;