const express = require("express");
const {
  authController
} = require("../controller");
const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.logIn);

module.exports = router;