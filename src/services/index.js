const paymentService = require('./payment.service')
const authService = require("./auth.service")
const productsService = require("./products.service")
const transactionService = require("./transactions.service")
const orderService = require("./order.service")

module.exports = {
    paymentService, authService, productsService, transactionService, orderService
}