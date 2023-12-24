const catchAsync = require("../utils/catchAsync");
const {orderService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const { paginateOptions } = require("../utils/utils.utils");

const getMyOrders = catchAsync(async (req, res, next) => {
  const auth = res.locals.auth
  const data = req.body
  const paginationOptions = paginateOptions(req)
  const create = await orderService.getMyOrders({
    query: req.query,
    paginationOptions,
    auth
  });
  return successResponse(res, create);
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const paginationOptions = paginateOptions(req)
  const create = await orderService.getAllOrders({
    paginateOptions: paginationOptions
  })
  return successResponse(res, create);
});

const getOneOrder = catchAsync(async (req, res, next) => {
  const create = await orderService.getOneOrder({
    id: req.params.order_id
  })
  return successResponse(res, create);
});

const updateOrder = catchAsync(async (req, res, next) => {
  const create = await paymentService.getUsers();
  return successResponse(res, create);
});

module.exports = {
  updateOrder,
  getOneOrder,
  getAllOrders,
  getMyOrders
};
