"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//라이브러리
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const SocialRouter = express_1.default.Router();
//controller 연결
const socialController_1 = __importDefault(require("../controller/socialController"));
// passport-kakao Login
SocialRouter.get('/kakao', passport_1.default.authenticate('kakao'));
SocialRouter.get('/kakao/callback', socialController_1.default.kakaoLogin);
// passport-google Login
SocialRouter.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] })
//scope를 profile로만 줬을때는 email이 안들어옴(반대는 nickname이 안들어옴)
);
SocialRouter.get('/google/callback', socialController_1.default.googleLogin);
// passport-naver Login
SocialRouter.get('/naver', passport_1.default.authenticate('naver', null));
SocialRouter.get('/naver/callback', socialController_1.default.naverLogin);
exports.default = SocialRouter;
