const db = require('../../dataBase').getInstance();
const {DB_TABLES} = require('../../constant');

module.exports= async () => {
    const photoResponsiveModel = db.getModel(DB_TABLES.PHOTO_RESPONSIVE_STATUS);
    const status = await photoResponsiveModel.findAll({
        attributes: ['id','label']
    });
    return status;
}
