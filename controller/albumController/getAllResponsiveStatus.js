const {photoService} = require('../../service');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req,res,next) => {
    try {
        const status = await photoService.getResponsiveStatus();
        res.send(status);
    }catch (e) {
        res.status(404).json({
            success: false,
            msg: e.message
        })
    }
    next();
};
