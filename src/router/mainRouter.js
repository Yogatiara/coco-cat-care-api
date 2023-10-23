const router = require('express').Router();

const servant = require('./servantRouter');

router.use('/api/v1/servants', servant);

module.exports = router;
