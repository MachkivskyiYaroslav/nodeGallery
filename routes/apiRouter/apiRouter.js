const router = require('express').Router();
const {albumController, photoController} = require('../../controller');
const {albumMiddleware,filesMiddleware,photoMiddleware} = require('../../middlewares')

router.get('/getAllTypesAlbums', albumController.getAllTypesAlbums);
router.get('/getAllResponsiveStatus', albumController.getAllResponsiveStatus);
router.get('/getAllAlbums', albumController.getAllAlbums);
router.get('/:type/:id/:title',albumController.getAlbumById);
router.post('/addSliderPhoto',
    filesMiddleware.checkPhotoMiddleware,
    albumMiddleware.CheckIfTheAlbumIsPresetMiddleware,
    filesMiddleware.checkIfThePhotoStatusIsResponsiveMiddleware,
    photoController.addPhoto) ;
module.exports = router;

