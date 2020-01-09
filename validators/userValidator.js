const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(40).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
});
