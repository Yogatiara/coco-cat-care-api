const router = require('express').Router();

const servant = require('./servantRouter');
const customer = require('./customerRouter');
const cat = require('./catRouter');
const memberCard = require('./memberCardRouter');

router.use('/api/v1/servants', servant);
router.use('/api/v1/customers', customer);
router.use('/api/v1/cats', cat);
router.use('/api/v1/memberCards', memberCard);

module.exports = router;
