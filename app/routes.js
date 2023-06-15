// External dependencies
const express = require('express');
const router = express.Router();

// ****************************************
// Route File Versions
// ****************************************

router.use('/v2/', require('./views/v2/_routes'));
router.use('/v1/', require('./views/v1/_routes'));

module.exports = router;
