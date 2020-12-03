const express = require('express');
const router = express.Router(); // initialised router
router.use('/v1', require('./v1/index'));
module.exports = router;