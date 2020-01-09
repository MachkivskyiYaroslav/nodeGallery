const db = require('../../dataBase').getInstance();
const {DB_TABLES} = require('../../constant');

module.exports = async (photo_id) => {
    const photoModel = db.getModel(DB_TABLES.ALBUM_PHOTO);
    const photo = await photoModel.findByPk(photo_id,{});

    return photo && photo.dataValues;
};
