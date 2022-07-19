import express from 'express';
import UploadController from '../controller/uploadController';
import upload from '../middlewares/multerS3';

const UploadRouter = express.Router();

// 멀티파트 폼데이터 변수 선언. 두개의 폼필드 안에 필드 네임으로 나눔.
const multiImg = upload.image.fields([
    { name: 'image', maxCount: 5 },
    { name: 'images', maxCount: 10 },
]);

// 1차 스코프. 이미지 업로더
UploadRouter.post('/image', upload.image.array('image', 5), UploadController.imageUploader);

// 단일 이미지 업로드
UploadRouter.post('/single', upload.image.single('image'), UploadController.singleImage);

// 배열로 이미지 업로드 - 파일수 5개로 제한
UploadRouter.post('/array', upload.image.array('image', 5), UploadController.arrayImages);

// 멀티파트폼 업로드
UploadRouter.post('/multi', multiImg, UploadController.multiImages);

export default UploadRouter;
