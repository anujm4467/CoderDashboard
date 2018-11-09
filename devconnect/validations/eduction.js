/** @format */

// Validation/experiance
// experiance validation

const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validatorEducationInput(data) {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  // cheacking the school field is empty or not
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required !!";
  }

  // cheacking the degree is empty or not
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required !!";
  }

  // cheacking the from is empty or not
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required !!";
  }

  // cheacking the fieldofstudy is empty or not
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy field is required !!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
