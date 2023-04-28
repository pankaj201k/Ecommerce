const Joi = require("joi");
const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    mobileNumber: Joi.string().required().length(10),
    password: Joi.string().min(3).max(15).required().label("Password"),
  }),
};
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(3).max(15).required().label("Password"),
  }),
};
module.exports = {
  createUser,
  login,
};
