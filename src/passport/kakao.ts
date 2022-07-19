import { Document, Types } from 'mongoose';
import passport from 'passport';
import { IUser } from '../interface/user';
const KakaoStrategy = require('passport-kakao').Strategy;
import User from '../models/user';
require('dotenv').config();

export default function kakao() {
    passport.use( "kakao", 
        new KakaoStrategy({
                clientID: process.env.KAKAO_ID,
                callbackURL: process.env.KAKAO_CALLBACK_URL,
            },

            async(accessToken: any, refreshToken: any, profile: { id: any; username: any; _json: { kakao_account: { email: any; }; }; }, done: (arg0: unknown, arg1: (IUser & Document<any, any, any> & { _id: Types.ObjectId; }) | undefined) => void) => {
                try {
                    const exUser = await User.findOne(
                        // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                        { snsId: profile.id, provider: 'kakao' }
                    );
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            name: profile.username,
                            snsId: profile.id,
                            email: profile._json.kakao_account.email,
                            provider: 'kakao',
                        });
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done;
                }
            }
        )
    );
};