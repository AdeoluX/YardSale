const authController = require("./auth.controller")
const paymentController = require("./payment.controller")
const productsController = require("./products.controller")
const orderController = require("./order.controller")
const transactionController = require("./transaction.controller")

module.exports = {
    authController,
    paymentController,
    productsController,
    orderController,
    transactionController
}