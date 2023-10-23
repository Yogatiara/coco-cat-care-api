const router = require('express').Router();

const servantController = require('../controllers/servantController');

router
  .route('/')
  .get(servantController.getServant)
  .post(servantController.insertServant);

router
  .route('/:id')
  .get(servantController.getServantById);

module.exports = router;
