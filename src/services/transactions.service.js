const httpStatus = require("http-status");
// const { findUserByEmail, createUser } = require("../dbservices/user.table");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");
const { upload } = require("../utils/cloudinary.utils");

const getAllUsersTransaction = async ({query, paginationOptions, auth}) => {
  const { name } = query
  const {id} = auth
  let conditions = {
    status: 'successful',
    user: id
  }
  if(name){
    conditions = {
      ...conditions,
      $or: [
        {reference: {$regex: new RegExp(name, 'i')}},
      ]
    }
  }
  const transactions = await genericRepo.setOptions('Transaction', {
    condition: conditions,
    paginateOptions: paginationOptions,
  }).findAllAndPagination()
  return transactions;
};

const getTransaction = async ({id}) => {
  const product = (await genericRepo.setOptions('Transaction', {
    condition: { _id: id },
    inclussions: [{
      path: 'order',
      populate: {
        path: 'product',
        model: 'Product',
      },
    }]
  }).findOne()).toJSON();
  return product
};

const getAllTransaction = async ({paginationOptions}) => {
  const product = await genericRepo.setOptions('Transaction', {
    condition: {  },
    paginateOptions: paginationOptions
  }).findAllAndPagination()
  return product
};

module.exports = {
  getAllUsersTransaction,
  getTransaction,
  getAllTransaction
};
