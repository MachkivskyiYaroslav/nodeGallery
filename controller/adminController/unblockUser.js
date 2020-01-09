const {adminService} = require('../../service');
const {USER_STATUS} = require('../../constant');
const ErrorHandler = require('../../error/ErrorHandler');


module.exports = async (req, res) => {
    try {
        const {id, status_id} = req.user;

        if (status_id === USER_STATUS.ACTIVE) {
            throw new ErrorHandler('user already unBlocked', 403, 'adminUnBlockUser')
        }

        await adminService.blockUser(id);

        res.end();
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
};
