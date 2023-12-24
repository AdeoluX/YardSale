const httpStatus = require("http-status");
// const { findUserByEmail, createUser } = require("../dbservices/user.table");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");
const { upload } = require("../utils/cloudinary.utils");

const getMyOrders = async ({query, paginationOptions, auth}) => {
  const { name } = query
  const {id} = auth
  let conditions = {
    user: id
  }
  if(name){
    conditions = {
      ...conditions
    }
  }
  const orders = await genericRepo.setOptions('Order', {
    condition: conditions,
    paginateOptions: paginationOptions,
    inclussions: ['product']
  }).findAllAndPagination()
  return orders;
};

const getAllOrders = async ({paginateOptions}) => {
  const product = await genericRepo.setOptions('Order', {
    condition: {  },
    inclussions: ['product'],
    paginateOptions,
    inclussions: ['user']
  }).findAllAndPagination();
  return product
};

const getOneOrder = async ({id}) => {
  const product = await genericRepo.setOptions('Order', {
    condition: { _id: id },
    inclussions: ['product', 'user']
  }).findOne()
  return product
};

module.exports = {
  getOneOrder,
  getAllOrders,
  getMyOrders
};
