const db = require('../../dataBase').getInstance();
const {DB_TABLES} = require('../../constant');

module.exports = async (photo_id) => {
    const photoModel= db.getModel(DB_TABLES.ALBUM_PHOTO);

    await photoModel.destroy({
        where: {
            id: photo_id
        }
    });

};
