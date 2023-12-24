const paymentRoutes = require('./payment.route')
const authRoutes = require("./auth.route")
const productsRoutes = require("./products.route")
const transactionRoute = require("./transaction.route")
const orderRoute = require("./orders.route")

module.exports = {
    paymentRoutes, authRoutes, productsRoutes, transactionRoute, orderRoute
}