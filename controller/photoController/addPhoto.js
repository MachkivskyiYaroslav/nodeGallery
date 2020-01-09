const fs = require('fs-extra');
const Joi = require('joi');
const {photoValidator} = require('../../validators');
const {resolve} = require('path');
const uuid = require('uuid');
const {albumService, photoService} = require('../../service');


module.exports = async (req, res) => {

    const {album_id} = req.body;
    let photos = [];
    console.lo
    const files = Object.values(req.files);
    console.log(req.files);
    const {id, album_title,type_album_id} = await albumService.getAlbumById(album_id);
    const {type} = await albumService.getTypeAlbumById(type_album_id);
    const photoDirectory = `albums/${type}/${id}/${album_title.replace(/\s+/g, '')}`;

    for (let i = 0; i < files.length; i++) {
        photos.push(files[i]);
        let isPhotoDataValid = Joi.validate(photos[i],photoValidator,{stripUnknown: true});
        if(isPhotoDataValid.error){
            const label = isPhotoDataValid.error.details[0].context.label;
            const msg =  isPhotoDataValid.error.details[0].message.replace(/['"]+/g, '');
            const errors = {
                [label]: msg
            };
            return res.status(400).send(errors).end();
        }
        let photosName = uuid() + '.' + photos[i].name.split('.').pop();
        photos[i].path = `${photoDirectory}/${photosName}`;
        photos[i].name = photosName;
        await photoService.addPhoto(
            {
                path: photos[i].path,
                alt: photos[i].alt,
                album_id: id,
                photo_responsive_status: photos[i].photo_responsive_status,
                album_link: photos[i].album_link,
                title: photos[i].title
            });
        await photos[i].mv(resolve(appRoot, 'public', photoDirectory, photos[i].name));
        res.status(201).end();
    }

    // const {id,album_title} = await albumService.getAlbumById(album_id);
    // const photoDirectory = `albums/${id}_${album_title.replace(/\s+/g, '')}`;
    // console.log(photos.length);
    // for(let i=0; i<photos.length;i++){
    //     console.log(i);
    //     let photosName = uuid() + '.' + photos[i].name.split('.').pop();
    //     photos[i].path =  `${photoDirectory}/${photosName}`;
    //     photos[i].name = photosName;
    //     await photos[i].mv(resolve(appRoot, 'public', photoDirectory, photos[i].name));
    //
    // }
};
