const router = require('express').Router();

const servantController = require('../controllers/servantController');

const chekBodyRequire = require('../middlewares/chekBodyServantRequire');

router
  .route('/')
  .get(servantController.getServant)
  .post(
    chekBodyRequire,
    servantController.insertServant
  );

router
  .route('/:id')
  .get(servantController.getServantById)
  .put(servantController.updateServant)
  .delete(servantController.deleteServant);

module.exports = router;
