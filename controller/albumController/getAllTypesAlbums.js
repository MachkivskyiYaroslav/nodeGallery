const {albumService} = require('../../service');
module.exports = async (req,res,next) => {
    try {
        const album = await albumService.getAllTypeAlbums();
        res.send(album);
    }catch (e) {
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
    next();
};
