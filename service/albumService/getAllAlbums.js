const db = require('../../dataBase').getInstance();
const {DB_TABLES} = require('../../constant');
module.exports = async () => {
    const AlbumModel = db.getModel(DB_TABLES.ALBUM);
    const typeModel= db.getModel(DB_TABLES.ALBUM_TYPE);
    const album = await AlbumModel.findAll({
        attributes: ['id', 'type_album_id', 'album_title', 'album_about', 'cover_photo_path'],
        include:[{
            model: typeModel,
            attributes: ['type']
        }]
    });
    return album;
};
