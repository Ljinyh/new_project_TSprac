"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const naverStrategy = require('passport-naver').Strategy;
const user_1 = __importDefault(require("../models/user"));
module.exports = () => {
    passport_1.default.use(new naverStrategy({
        clientID: "KJzlE_oEdjnN1_ysh7Fz",
        clientSecret: "aqDUahiWqh",
        callbackURL: "https://realprojectapiserver.com/api/auth/naver/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne(
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            { snsId: profile.id, provider: 'naver' });
            // 이미 가입된 카카오 프로필이면 성공
            if (exUser) {
                done(null, exUser);
            }
            else {
                // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                const newUser = yield user_1.default.create({
                    nickname: profile.displayName,
                    snsId: profile.id,
                    email: profile._json.email,
                    provider: 'naver',
                });
                done(null, newUser); // 회원가입하고 로그인 인증 완료
            }
        }
        catch (error) {
            console.error(error);
            done;
        }
    })));
};
