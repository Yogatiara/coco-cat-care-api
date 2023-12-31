const router = require("express").Router();

const servant = require("./servantRouter");
const customer = require("./customerRouter");
const cat = require("./catRouter");
const memberCard = require("./memberCardRouter");
const care = require("./careRouter");
const service = require("./serviceRouter");

router.use("/api/v1/servants", servant);
router.use("/api/v1/customers", customer);
router.use("/api/v1/cats", cat);
router.use("/api/v1/memberCards", memberCard);
router.use("/api/v1/care", care);
router.use("/api/v1/service", service);

module.exports = router;
