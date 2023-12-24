const catchAsync = require("../utils/catchAsync");
const {productsService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const { paginateOptions } = require("../utils/utils.utils");

const addProducts = catchAsync(async (req, res, next) => {
  const create = await productsService.addProducts({data: req.body, file: req?.files?.file?.tempPath});
  return successResponse(res, create);
});


const getAllProducts = catchAsync(async (req, res, next) => {
  const paginationOptions = paginateOptions(req)
  const create = await productsService.getAllProducts({
    query: req.query,
    paginationOptions,
  })
  return successResponse(res, create);
});


const getOneProduct = catchAsync(async (req, res, next) => {
  const create = await productsService.getOneProduct({id: req.params.id})
  return successResponse(res, create);
});


const updateProducts = catchAsync(async (req, res, next) => {
  const create = await productsService.updateProducts({
    id: req.params.id,
    changes: req.body,
    file: req?.files?.file?.tempFilePath
  })
  return successResponse(res, create);
});

module.exports = {
  getAllProducts, addProducts, getOneProduct, updateProducts
};
