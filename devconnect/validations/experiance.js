/** @format */

// Validation/experiance
// experiance validation

const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validatorExperianceInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // cheacking the email field is empty or not
  if (validator.isEmpty(data.title)) {
    errors.title = "title field is required !!";
  }

  // cheacking the company is empty or not
  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required !!";
  }

  // cheacking the from is empty or not
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required !!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
