const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");

const userSignUp = async ({email, password, confirmPassword, phone, firstname, lastname}) => {
  const check = await genericRepo.setOptions('User', {
    condition: {email}
  }).findOne()
  // const check = await findUserByEmail(data.email);
  abortIf(check, httpStatus.BAD_REQUEST, "Email Already Exists");
  abortIf(password !== confirmPassword, httpStatus.BAD_REQUEST, "Passwords must match");
  const salt = await bcrypt.genSalt(10);
  const enc_password = await bcrypt.hash(password, salt);
  let user = await genericRepo.setOptions('User', {
    data: {
      email,
      password: enc_password,
      phone,
      firstname,
      lastname,
    }
  }).create()
  const token = generateToken({ id: user.id, role: user.role, email: user.email });
  abortIf(user == null, httpStatus.BAD_REQUEST, "Unable to SignUp");
  return {...user.toJSON(), token};
};

const login = async ({email, password}) => {
  abortIf(
    !email || !password,
    httpStatus.BAD_REQUEST,
    "Please provide an email or a password"
  );
  const user = await genericRepo.setOptions("User", {
    condition: {email}
  }).findOne()
  abortIf(!user, httpStatus.BAD_REQUEST, "email or password is wrong");
  const check = await bcrypt.compare(password, user.password);
  //user.password = null;
  const user_data = user.toJSON()
  abortIf(!check, httpStatus.BAD_REQUEST, "email or password is wrong");
  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  return { ...user_data, ...token };
};

module.exports = {
  login,
  userSignUp,
};
