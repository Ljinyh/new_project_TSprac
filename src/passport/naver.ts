import { Document, Types } from 'mongoose';
import passport from 'passport';
import { IUser } from '../interface/user';
const naverStrategy = require('passport-naver').Strategy;
import User from '../models/user';

module.exports = () => {
    passport.use(
        new naverStrategy({
                clientID: "KJzlE_oEdjnN1_ysh7Fz",
                clientSecret: "aqDUahiWqh",
                callbackURL: "https://realprojectapiserver.com/api/auth/naver/callback",
            },

            async(accessToken: any, refreshToken: any, profile: { id: any; displayName: any; _json: { email: any; }; }, done: (arg0: unknown, arg1: (IUser & Document<any, any, any> & { _id: Types.ObjectId; }) | undefined) => void) => {
                try {
                    const exUser = await User.findOne(
                        // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                        { snsId: profile.id, provider: 'naver' }
                    );
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            nickname: profile.displayName,
                            snsId: profile.id,
                            email: profile._json.email,
                            provider: 'naver',
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