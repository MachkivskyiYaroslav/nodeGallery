const express= require('express');
const {resolve} = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app= express();
app.use(cors());

//TODO settings cors

//TODO npm i helmet

const db= require('./dataBase').getInstance();
db.setModels();


app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(resolve(__dirname,'public')));



const {photoController,albumController} =require('./controller');

global.appRoot = __dirname;
const {userRouter,authRouter,adminRouter,apiRouter}=require('./routes');

app.use('/users', userRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/api', apiRouter);
const {albumMiddleware,filesMiddleware,photoMiddleware,authMiddleware}=require('./middlewares');
const {albumService} = require('./service');
app.post('/test',
    filesMiddleware.checkPhotoMiddleware,
    albumMiddleware.CheckIfTheAlbumIsPresetMiddleware,
    filesMiddleware.checkIfThePhotoStatusIsResponsiveMiddleware,
    photoController.addPhoto);
app.post('/delete',
    photoMiddleware.checkIfThePhotoPresetMiddleware,
    photoController.deletePhoto);
app.get('/getUserFromToken', authMiddleware.getUserFromTokenMiddleware);

app.get('/test2',albumService.getAllAlbums );
app.get ('/test4/:type/:id/:title', albumController.getAlbumById);
app.post('/test3',albumMiddleware.CheckIfTheAlbumIsPresetMiddleware, albumController.DeleteAlbumById);


app.all('*', (req,res) => {
    res.status(404).end();
});

app.listen(3000, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Listen 3000');
    }
});

