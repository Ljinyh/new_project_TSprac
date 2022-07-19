import express from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import roomController from '../controller/roomController';

const roomRouter = express.Router();

// 사용자 맛방 전체조회
roomRouter.get('/', authMiddleware, roomController.allRoom);

//맛방 detail - 멤버 리스트
roomRouter.get('/:roomId/users', authMiddleware, roomController.detailRoomMember);

//사용자 찾기 API
roomRouter.post('/findUser', authMiddleware, roomController.findUser);

//맛방 detail - 방 정보
roomRouter.get('/:roomId', authMiddleware, roomController.detailRoomInfo);

//맛방 detail - 맛집 리스트
roomRouter.get(
    '/:roomId/storeList',
    authMiddleware,
    roomController.detailRoomStoreList
);

// 맛방 만들기
roomRouter.post('/', authMiddleware, roomController.writeRoom);

//룸코드 검색
roomRouter.post('/searchR-Code', authMiddleware, roomController.searchRoomCode);

//룸코드로 입장
roomRouter.put('/R-Code', authMiddleware, roomController.roomCode);

roomRouter.post('/:roomId/roomCode', authMiddleware, roomController.findRoomCode);

// 맛방 초대 (공유하기)
roomRouter.put('/:roomId/invite', authMiddleware, roomController.inviteRoom);

// 맛방 강퇴
roomRouter.put('/:roomId/kickUser', authMiddleware, roomController.kickRoom);

// 맛방 순서 변경
roomRouter.put('/roomset', authMiddleware, roomController.setSequenceRoom);

// 맛방 수정
roomRouter.put('/:roomId', authMiddleware, roomController.rewriteRoom);

// 맛방 삭제
roomRouter.delete('/:roomId', authMiddleware, roomController.deleteRoom);

// 맛방 나가기
roomRouter.put('/:roomId/exit', authMiddleware, roomController.exitRoom);

// 맛방에 저장
roomRouter.post('/:roomId/storeList', authMiddleware, roomController.saveStore);

export default roomRouter;