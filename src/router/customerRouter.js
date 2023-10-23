const router = require('express').Router();

const customerController = require('../controllers/customerController');

const chekBodyRequire = require('../middlewares/chekBodyCustomerRequire');

router
  .route('/')
  .get(customerController.getCustomer)
  .post(
    chekBodyRequire,
    customerController.insertCustomer
  );

router
  .route('/:id')
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
