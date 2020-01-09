const db = require('../../dataBase').getInstance();
const {DB_TABLES} = require('../../constant');
module.exports = async () => {
    const typeModel= db.getModel(DB_TABLES.ALBUM_TYPE);
    const AlbumType = await typeModel.findAll({});
    return AlbumType;
        // && AlbumType.dataValues;
};
