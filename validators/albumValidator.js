const Joi = require('joi');

module.exports = Joi.object().keys({
    type_album_id: Joi.string().required(),
    album_title:  Joi.string().min(5).max(50).required(),
    album_about:  Joi.string().min(5).max(600).required(),
    shooting_date: Joi.string().min(5).max(50).required(),
    alt: Joi.string().min(5).max(50).required(),
})
