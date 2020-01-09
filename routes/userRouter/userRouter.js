const router = require('express').Router();
const {userController}= require('../../controller');
const {userMiddleware}= require('../../middlewares');

router.post('/',
    userMiddleware.checkUniqueEmailMiddleware,
    userController.createUser);

module.exports= router;
