const {albumService} = require('../../service');

module.exports = async (req,res,next) => {
    try {
        const allAlbums = await albumService.getAllAlbums();
        res.json(allAlbums);
    }catch (e) {

    }
}
