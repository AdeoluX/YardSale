const express = require("express");
const { signUpValidate } = require("../validations/user.validations");
const {
  productsController
} = require("../controller");
const { verify, verifyAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyAdmin, productsController.addProducts);
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getOneProduct);
router.patch("/:id", productsController.updateProducts);

module.exports = router;