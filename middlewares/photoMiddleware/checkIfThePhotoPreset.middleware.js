const {photoService} = require('../../service');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    const {photo_id} = req.body;

    const photo = await photoService.getPhotoById(photo_id);

    if (!photo) {
        res.status(404).send('Photo not found');
        return next(new ErrorHandler('Photo not found', 404, 'checkIfThePhotoIsPreset'));
    }

    next();
};
