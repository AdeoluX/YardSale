const express = require("express");
const {
  transactionController
} = require("../controller");
const { verify, verifyAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/get-my-transactions", verify, transactionController.getAllUsersTransaction);
router.get("/all", verifyAdmin, transactionController.getAllTransaction);
router.get("/:id", verify, transactionController.getTransaction);

module.exports = router;