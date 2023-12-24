const catchAsync = require("../utils/catchAsync");
const {transactionService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const { paginateOptions } = require("../utils/utils.utils");

const getAllUsersTransaction = catchAsync(async (req, res, next) => {
  const auth = res.locals.auth
  const paginationOptions = paginateOptions(req)
  const create = await transactionService.getAllUsersTransaction({
    query: req.query,
    auth,
    paginationOptions
  })
  return successResponse(res, create);
});

const getTransaction = catchAsync(async (req, res, next) => {
  const create = await transactionService.getTransaction({id: req.params.id});
  return successResponse(res, create);
});

const getAllTransaction = catchAsync(async (req, res, next) => {
  const paginationOptions = paginateOptions(req)
  const create = await transactionService.getAllTransaction({
    paginationOptions 
  })
  return successResponse(res, create);
});

module.exports = {
  getAllTransaction,
  getTransaction,
  getAllUsersTransaction

};
