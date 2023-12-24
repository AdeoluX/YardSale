const catchAsync = require("../utils/catchAsync");
const {paymentService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

const initiate = catchAsync(async (req, res, next) => {
  const auth = res.locals.auth
  const data = req.body
  const create = await paymentService.initiate({auth, data});
  return successResponse(res, create);
});

const callBack = catchAsync(async (req, res, next) => {
  const create = await paymentService.callback({query: req.query});
  return successResponse(res, create);
});

const verifyTransaction = catchAsync(async (req, res, next) => {
  const create = await paymentService.getUsers();
  return successResponse(res, create);
});

module.exports = {
  initiate,
  callBack,
  verifyTransaction
};
