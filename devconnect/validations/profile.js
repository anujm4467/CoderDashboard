/** @format */

// validation / profile

// Profile validation

const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function validatorProfileInput(data) {
  const errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // cheacking the handle field length
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle should be min 2 character  !!";
  }

  // cheacking the handle field is empty or not
  if (validator.isEmpty(data.handle)) {
    errors.handle = "handle field is required !!";
  }

  // cheacking the status is empty or not
  if (validator.isEmpty(data.status)) {
    errors.status = "status field is required !!";
  }

  // cheacking the skill is empty or not
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required !!";
  }

  // cheacking the website is valid or not
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  // cheacking the youtube is valid or not
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }

  // cheacking the facebook is valid or not
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid url";
    }
  }

  // cheacking the instagram is valid or not
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid url";
    }
  }

  // cheacking linkedin is valid or not
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
