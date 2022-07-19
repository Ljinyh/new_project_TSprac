"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = express_1.default.Router();
// 회원가입 API.
userRouter.post('/signup', userController_1.default.signUp);
// 이메일, 비밀번호 중복확인
userRouter.post('/checkId', userController_1.default.check);
// 비밀번호 중복 확인
userRouter.post('/checkPass', userController_1.default.PassCehck);
//회원가입 시 인증번호 이메일 발송 API
userRouter.post('/mail', userController_1.default.sendMail);
// 아이디 찾기 시 인증번호 이메일 발송 API
userRouter.post('/sendmail', userController_1.default.mailSending);
// //인증번호 문자 발송 API
// userRouter.post('/sms', userController.sendSMS);
// 로그인 API
userRouter.post('/login', userController_1.default.login);
//아이디 찾기 API
userRouter.post('/findUserId', userController_1.default.findUserId);
//비밀번호 찾기
userRouter.post('/findPass', userController_1.default.findPass);
//사용자 정보 수정
userRouter.put('/edit', auth_middleware_1.default, userController_1.default.userinfoEdit);
// 사용자 정보 조회 API, 로그인 시 사용
userRouter.get('/me', auth_middleware_1.default, userController_1.default.userInfo);
exports.default = userRouter;
