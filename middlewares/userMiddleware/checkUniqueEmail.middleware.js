const {userService} = require('../../service');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req,res,next) => {
    const {email}= req.body;

    const user = await userService.getUserByParams({email, email:email});
    if(user){
        const errors = {
            email: user.email + ' is already used'
        };
        console.log(user.email + ' is already used');
        return  next(res.status(400).send(errors).end());

    }
    next();


};
