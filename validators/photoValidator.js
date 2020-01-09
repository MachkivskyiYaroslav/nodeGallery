const Joi = require('joi');

module.exports = Joi.object().keys({
    album_id: Joi.number().integer().required(),
    photo_responsive_status: Joi.string().min(1).max(2).required(),
    alt: Joi.string().min(5).max(50).required(),
    album_link: Joi.string().min(5).max(50),
    title:  Joi.string().min(5).max(50),
});
