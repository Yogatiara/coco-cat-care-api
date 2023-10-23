const router = require('express').Router();

const servant = require('./servantRouter');
const customer = require('./customerRouter');

router.use('/api/v1/servants', servant);
router.use('/api/v1/customers', customer);

module.exports = router;
