const {FILES_CHECK} = require('../../constant');
const ErrorHandler = require('../../error/ErrorHandler');
const check= require('./checkIfThePhotoStatusIsResponsive.middleware');
module.exports =  (req, res, next) => {

    req.photos = [];
    // req.alt =[]
    if (!req.files) {
        console.log('NO FILES')
        return res.status(400).send('No files selected').end();
    }
    console.log(req.body);
    console.log(req.files);
    const files = Object.values(req.files);
    for (let i = 0; i < files.length; i++) {
        const {mimetype, size, name} = files[i];

        if (FILES_CHECK.PHOTO_MIMETYPES.includes(mimetype)) {

            if (FILES_CHECK.MAX_PHOTO_SIZE < size) {
                return next(new ErrorHandler(
                    `Max file size is ${FILES_CHECK.MAX_PHOTO_SIZE / (1024 * 1024)}mb`,
                    400,
                    'photoFileChecker')
                )
            }
            if(files.length>1){
                files[i].album_id = req.body.album_id[i];
                files[i].alt=  req.body.alt[i];
                files[i].photo_responsive_status = req.body.photo_responsive_status[i];
                files[i].album_link = req.body.album_link[i];
                files[i].title = req.body.title[i];
                req.photos.push(files[i]);
            }
            files[i].alt = req.body.alt;
            files[i].photo_responsive_status = req.body.photo_responsive_status;
            files[i].album_link = req.body.album_link;
            files[i].title = req.body.title;
            files[i].album_id = req.body.album_id;
            req.photos.push(files[i]);
        }  else {
            next(new ErrorHandler(`File ${name} is not valid`, 400, 'photoFileChecker'))
        }
    }
    next()
};
