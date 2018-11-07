/** @format */
const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validatorRegisterInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // checking the length of user name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name Must Be Between 2 and 30 Character";
  }

  // cheacking the name field is empty or not
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required !!";
  }

  // cheacking the email field is valid or not
  if (!validator.isEmail(data.email)) {
    errors.email = "Email should be valid  !!";
  }

  // cheacking the email field is empty or not
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required !!";
  }

  // cheacking the password length
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password length is must be 6 character !!";
  }

  // cheacking the password is empty or not
  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required !!";
  }

  // cheacking the confirm password field is empty or not
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password field is required !!";
  }

  // cheacking the confirm password is matched
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password does not match please try again !!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
