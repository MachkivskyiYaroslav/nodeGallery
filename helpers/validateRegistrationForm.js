const {userValidator}= require('../validators');
const ErrorHandler = require('../error/ErrorHandler');
const Joi = require('joi');

module.exports = async (userObject) => {
    const userValid = await Joi.validate(userObject,userValidator);
}
