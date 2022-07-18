import express from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import userController from '../controller/userController';

const userRouter = express.Router();

// 회원가입 API.
userRouter.post('/signup', userController.signUp);

// 이메일, 비밀번호 중복확인
userRouter.post('/checkId', userController.check);

// 비밀번호 중복 확인
userRouter.post('/checkPass', userController.PassCehck);

//회원가입 시 인증번호 이메일 발송 API
userRouter.post('/mail', userController.sendMail);

// 아이디 찾기 시 인증번호 이메일 발송 API
userRouter.post('/sendmail', userController.mailSending);

// //인증번호 문자 발송 API
// userRouter.post('/sms', userController.sendSMS);

// 로그인 API
userRouter.post('/login', userController.login);

//아이디 찾기 API
userRouter.post('/findUserId', userController.findUserId);

//비밀번호 찾기
userRouter.post('/findPass', userController.findPass);

//사용자 정보 수정
userRouter.put('/edit', authMiddleware, userController.userinfoEdit);

// 사용자 정보 조회 API, 로그인 시 사용
userRouter.get('/me', authMiddleware, userController.userInfo);

export default userRouter;