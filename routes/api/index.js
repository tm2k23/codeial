const express = require('express');
const router = express.Router(); // initialised router
router.use('/v1', require('./v1/index'));
router.use('/v2', require('./v2/index'));
module.exports = router;