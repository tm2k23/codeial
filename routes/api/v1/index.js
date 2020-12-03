const express = require('express');
const router = express.Router(); // initialised router
router.use('/posts', require('./posts'));
module.exports = router;