const {userService,oAuthService}= require('../../service');
const {USER_ROLES,USER_STATUS,JWT_METHOD} = require('../../constant');
const {passwordHasher, tokenizer}= require('../../helpers');
const {userValidator}= require('../../validators');
const ErrorHandler = require('../../error/ErrorHandler');
const Joi = require('joi');

module.exports= async (req,res) => {
    try{
        const user = req.body;

        const isUserValid = Joi.validate(user,userValidator);

        if(isUserValid.error){
            const label = isUserValid.error.details[0].context.label;
            const msg =  isUserValid.error.details[0].message.replace(/['"]+/g, '');
            const errors = {
                [label]: msg
            };
            return res.status(400).send(errors).end();
        }

        user.role_id= USER_ROLES.USER;
        user.status_id= USER_STATUS.ACTIVE;
        user.password =await passwordHasher(user.password);

        const {id} = await userService.createUser(user);
        const tokens = tokenizer(JWT_METHOD.USER);

        await oAuthService.insertTokenPair({user_id: id, ...tokens});
        res.json({
            token: tokens.access_token
        }).end();
    }catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            });
    }
};
