import { Document, Types } from 'mongoose';
import passport from 'passport';
import { IUser } from '../interface/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../models/user';
require('dotenv').config();

export default function google() {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_PASS,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async(accessToken: any, refreshToken: any, profile: { id: any; displayName: any; _json: { email: any; }; }, done: (arg0: unknown, arg1: (IUser & Document<any, any, any> & { _id: Types.ObjectId; }) | undefined) => void) => {
                try {
                    const exUser = await User.findOne({
                        snsId: profile.id,
                        provider: 'google',
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            name: profile.displayName,
                            snsId: profile.id,
                            email: profile._json.email,
                            provider: 'google',
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

function arg1(argv0: string, arg1: any) {
    throw new Error('Function not implemented.');
}
