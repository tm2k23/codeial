const express = require('express');
const router = express.Router(); // initialised router
const postsApi = require('../../../controllers/api/v2/posts_api');
router.get('/', postsApi.index);
module.exports = router;