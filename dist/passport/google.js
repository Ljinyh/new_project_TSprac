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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user_1 = __importDefault(require("../models/user"));
module.exports = () => {
    passport_1.default.use(new GoogleStrategy({
        clientID: "223845972715-hqd6uqt5t2vv951kdv864gsjt6ca4n7a.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://realprojectapiserver.com/api/auth/google/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne({
                snsId: profile.id,
                provider: 'google',
            });
            if (exUser) {
                done(null, exUser);
            }
            else {
                const newUser = yield user_1.default.create({
                    name: profile.displayName,
                    snsId: profile.id,
                    email: profile._json.email,
                    provider: 'google',
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
function arg1(argv0, arg1) {
    throw new Error('Function not implemented.');
}
