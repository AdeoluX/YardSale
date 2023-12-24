const express = require("express");
const router = express.Router();

const {paymentController} = require('../controller');
const { verify } = require("../middleware/verifyToken");

router.post("/initiate", verify, paymentController.initiate);
router.get("/call-back", paymentController.callBack);

module.exports = router;