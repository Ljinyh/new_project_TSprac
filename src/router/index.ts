import express from 'express';
import userRouter from './userRouter';
import SocialLogin from './socialRouter';
import RoomRouter from './roomRouter';
import StoreRouter from './storeRouter';
import UploadRouter from './uploadRouter';

const router = express();

 router.use('/users', userRouter);
 router.use('/auth', SocialLogin);
 router.use('/rooms', RoomRouter);
 router.use('/store', StoreRouter);
 router.use('/upload', UploadRouter);

 export default router;