/** @format */

// Login validation

const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validatorLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // cheacking the email field is valid or not
  if (!validator.isEmail(data.email)) {
    errors.email = "Email should be valid  !!";
  }

  // cheacking the email field is empty or not
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required !!";
  }

  // cheacking the password is empty or not
  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required !!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
