//라이브러리
import express from 'express';
import passport from 'passport';
const SocialRouter = express.Router();

//controller 연결
import socialController from '../controller/socialController';

// passport-kakao Login
SocialRouter.get('/kakao', passport.authenticate('kakao'));

SocialRouter.get('/kakao/callback', socialController.kakaoLogin);

// passport-google Login
SocialRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
    //scope를 profile로만 줬을때는 email이 안들어옴(반대는 nickname이 안들어옴)
);

SocialRouter.get('/google/callback', socialController.googleLogin);


export default SocialRouter;