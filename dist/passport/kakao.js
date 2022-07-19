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
const KakaoStrategy = require('passport-kakao').Strategy;
const user_1 = __importDefault(require("../models/user"));
function kakao() {
    passport_1.default.use("kakao", new KakaoStrategy({
        clientID: "2771b333a0566c183aa6acaac0347520",
        callbackURL: "https://realprojectapiserver.com/api/auth/kakao/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne(
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            { snsId: profile.id, provider: 'kakao' });
            // 이미 가입된 카카오 프로필이면 성공
            if (exUser) {
                done(null, exUser);
            }
            else {
                // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                const newUser = yield user_1.default.create({
                    name: profile.username,
                    snsId: profile.id,
                    email: profile._json.kakao_account.email,
                    provider: 'kakao',
                });
                done(null, newUser); // 회원가입하고 로그인 인증 완료
            }
        }
        catch (error) {
            console.error(error);
            done;
        }
    })));
}
exports.default = kakao;
;
