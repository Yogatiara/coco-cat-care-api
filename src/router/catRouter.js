const router = require('express').Router();

const catController = require('../controllers/catController');
const chekBodyRequire = require('../middlewares/chekBodyCatRequire');

router
  .route('/')
  .get(catController.getCat)
  .post(chekBodyRequire, catController.insertCat);

router
  .route('/:id')
  .get(catController.getCatById)
  .put(catController.updateCat)
  .delete(catController.deleteCat);

module.exports = router;
