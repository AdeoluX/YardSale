const express = require("express");
const {
  orderController
} = require("../controller");
const { verify, verifyAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/get-my-orders", verify, orderController.getMyOrders);
router.get("/", verifyAdmin, orderController.getAllOrders);
router.patch("/:order_id", verifyAdmin, orderController.updateOrder);
router.get("/:order_id", verify, orderController.getOneOrder);

module.exports = router;