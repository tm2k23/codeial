const express = require('express');
const router = express.Router(); // initialised router
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
module.exports = router;