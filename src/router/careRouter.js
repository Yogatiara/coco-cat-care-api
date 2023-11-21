const router = require("express").Router();

const careController = require("../controllers/careController");
// const chekBodyRequire = require('../middlewares/chekBodyCatRequire');

router.route("/").get(careController.getCare).post(careController.insertCare);

router
  .route("/:id")
  .get(careController.getCareById)
  .put(careController.updateCare)
  .delete(careController.deleteCare);

module.exports = router;
