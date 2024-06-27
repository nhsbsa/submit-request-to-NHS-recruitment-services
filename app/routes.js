// External dependencies
const express = require('express');
const router = express.Router();

// log stuff - thanks Craig Abbott!

router.use((req, res, next) => {
    const log = {
        method: req.method,
        url: req.originalUrl, //URL of page
        data: req.session.data //all data held
    }
    console.log(JSON.stringify(log, null, 2)) // show all data as a dump in terminal
    next() // continue to next action
})

// ****************************************
// Route File Versions
// ****************************************

router.use('/v2/', require('./views/v2/_routes'));
router.use('/v1/', require('./views/v1/_routes'));

module.exports = router;
