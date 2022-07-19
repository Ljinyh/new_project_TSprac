import express from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import storeController from '../controller/storeController';

const StoreRouter = express.Router();

// 맛집 생성 (첫 기록하기)
StoreRouter.post('/:roomId', authMiddleware, storeController.createStore);

// 지도에 맛집 보여주기
StoreRouter.get('/map', authMiddleware, storeController.mapViewer)

export default StoreRouter;