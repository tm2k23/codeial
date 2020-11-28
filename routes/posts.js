const express = require('express');
const passport = require('passport');
const router = express.Router(); // initialised router
const postsController = require('../controllers/posts_controller');

router.post('/create', postsController.create);

module.exports = router;