require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const app = express();
const mongo = require('./src/config/db.config')

mongo

const { errorConverter, errorHandler } = require("./src/middleware/error");
const { authRoutes, productsRoutes, paymentRoutes, orderRoute, transactionRoute } = require("./src/routes");
const ApiError = require("./src/utils/ApiError");
const httpStatus = require("http-status");

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
  res.send("I LOVE YOU ❤️❤️ ❤️❤️ BANKEBI AKINSOLA ❤️❤️ ❤️❤️, NEVER DOUBT IT!! ❤️❤️ ❤️❤️")
})

app.use("/api/v1/pay", paymentRoutes);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productsRoutes)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/transaction", transactionRoute)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);
