const fs = require('fs');
const {resolve} = require('path');
const {photoService} = require('../../service');
module.exports = async (req, res) => {
    try {
        const {id} = req.body;
        const {path} = await photoService.getPhotoById(id);
        await photoService.deletePhotoById(id);
        fs.unlinkSync(resolve(`${appRoot}/public/${path}`));
        res.status(200).send('Photo Deleted');
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }

}
