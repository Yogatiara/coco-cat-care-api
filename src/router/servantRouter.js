const router = require('express').Router();

const servantController = require('../controllers/servantController');

router
  .route('/')
  .get(servantController.getServant)
  .post(servantController.insertServant);

router
  .route('/:id')
  .get(servantController.getServantById)
  .put(servantController.updateServant)
  .delete(servantController.deleteServant);

module.exports = router;
