const httpStatus = require("http-status");
// const { findUserByEmail, createUser } = require("../dbservices/user.table");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");
const { upload } = require("../utils/cloudinary.utils");

const getAllProducts = async ({query, paginationOptions}) => {
  const { name, minValue, maxValue } = query
  let conditions = {}
  if(name){
    conditions = {
      ...conditions,
      $or: [
        {name: {$regex: new RegExp(name, 'i')}},
        {description: {$regex: new RegExp(name, 'i')}},
      ]
    }
  }
  if(minValue || maxValue){
    conditions = {
      ...conditions,
      amount: {
        $gte: minValue,
        $lte: maxValue
      },
    }
  }
  const products = await genericRepo.setOptions('Product', {
    condition: conditions,
    paginateOptions: paginationOptions
  }).findAllAndPagination()
  return products;
};

const getOneProduct = async ({id}) => {
  const product = await genericRepo.setOptions('Product', {
    condition: { _id: id }
  }).findOne();
  return product
};

const addProducts = async ({data, file}) => {
  if(Array.isArray(data)){
    await genericRepo.setOptions('Product', {
      array: data
    }).bulkCreate();
  }else{
    let image = null
    if(file){
      image = (await upload(file)).secureUrl
    }
    await genericRepo.setOptions('Product', {
      data: {
        ...data,
        ...(image && {image})
      }
    }).create()
  }
  return {message: 'Saved successfully'}
};

const updateProducts = async ({id, changes, file}) => {
  if(file){
    const prod = (await genericRepo.setOptions('Product', {
      condition: {_id:id}
    }).findOne()).toJSON()
    const image = (await upload(file)).secure_url
    const list = prod.image
    list.push(image)
    changes = {
      image: list,
      ...changes
    }
  }
  const product = await genericRepo.setOptions('Product', {
    condition: {_id: id},
    changes
  }).update()
  return product;
};


module.exports = {
  getAllProducts,
  getOneProduct,
  addProducts,
  updateProducts
};
