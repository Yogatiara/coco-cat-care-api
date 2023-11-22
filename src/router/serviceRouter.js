const router = require("express").Router();

const serviceController = require("../controllers/serviceController");
// const chekBodyRequire = require("../middlewares/checkBodyCareRequire");

router
  .route("/")
  .get(serviceController.getService)
  .post(serviceController.insertService);

router
  .route("/:id")
  .get(serviceController.getServiceById)
  .put(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
