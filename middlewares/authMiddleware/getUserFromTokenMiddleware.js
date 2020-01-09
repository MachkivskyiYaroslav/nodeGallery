const ErrorHandler = require('../../error/ErrorHandler');
const {authService, userService} = require('../../service');
module.exports = async (req, res, next) => {
    const token = req.get('Authorization').replace('Bearer ', '');
    const {user_id} = await authService.getUserFromTokenByParams({access_token: token});

    if (!user_id) {
        return next(new ErrorHandler('No user', 404, 'getUserFromAccess'));
    }
    const user = await userService.getUserById(user_id);
    res.json(user);
    next()

    ;
};
