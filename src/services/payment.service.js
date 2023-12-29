const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");
const { generateRandomString } = require("../utils/utils.utils");
const { initiateCharge } = require("../utils/flutterwave.utils");
const mongoose = require('mongoose')

const initiate = async ({auth, data}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const reference = `ELBAM_${generateRandomString(7)}`
    const { product_id, quantity, address, size, color } = data
    const {id} = auth
    const findProduct = await genericRepo.setOptions('Product', {
      condition: {_id: product_id}
    }).findOne()
    abortIf(Number(findProduct.quantity) < Number(quantity), httpStatus.BAD_REQUEST, 'Not enough stock to fulfill this order!')
    const amount = Number(quantity) * Number(findProduct.amount)
    const user = await genericRepo.setOptions('User', {
      condition: {_id: id}
    }).findOne()
    
    const order = await genericRepo.setOptions('Order', {
      data: {
        product: findProduct._id,
        amount,
        user: user._id,
        address,
        quantity,
        size,
      },
      transaction: {session}
    }).create()
    const transaction = await genericRepo.setOptions('Transaction', {
      data: {
        order: order[0]._doc._id,
        amount,
        user: user._id,
        currency: "NGN",
        reference
      },
      transaction: {session}
    }).create()
    const initiater = await initiateCharge({
      amount,
      email: user.email,
      meta: {
        order_id: order[0]._doc._id,
        customer_id: user._id,
        quantity
      },
      reference
    }) 
    await session.commitTransaction();
    return {authorization_link: initiater};
  }catch(error){
    await session.abortTransaction();
    abortIf(error, httpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!");
  }finally{
    await session.endSession();
  }
};

const callback = async ({query: {status: txn_status, tx_ref}}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{

    const trn = (await genericRepo.setOptions('Transaction', {
      condition: {reference: tx_ref},
      inclussions: ["order"]
    }).findOne()).toJSON()

    //update product

    const product = await genericRepo.setOptions('Product', {
      condition: {_id: trn.order.product},
      changes: {
        $inc: {quantity: -Number(trn.order.quantity)}
      },
      transaction: session
    }).update()

    await genericRepo.setOptions('Transaction', {
      condition: {reference: tx_ref},
      changes: {status: (txn_status === 'success'|| txn_status === 'successful' || txn_status === 'completed') ? "successful" : txn_status},
      transaction: session
    }).update()
    await session.commitTransaction();
    return {};
  }catch(error){
    await session.abortTransaction();
    abortIf(error, httpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!");
  }finally{
    session.endSession();
  }
};

const verifyTransaction = async (data) => {
  return { };
};

module.exports = {
  initiate,
  callback,
  verifyTransaction
};
