"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
//Kakao callback Controller
const kakaoLogin = (req, res, next) => {
    passport_1.default.authenticate('kakao', { failureRedirect: '/' }, (err, user, info) => {
        if (err)
            return next(err);
        const { userId } = user;
        const token = jsonwebtoken_1.default.sign({ userId }, "scret_realproject", {
            expiresIn: '7d',
        });
        res.redirect(`http://localhost:3000/login?token=${token}`);
    })(req, res, next);
};
// Google callback Controller
const googleLogin = (req, res, next) => {
    passport_1.default.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
        if (err)
            return next(err);
        const { snsId } = user;
        const token = jsonwebtoken_1.default.sign({ snsId }, "scret_realproject", {
            expiresIn: '7d',
        });
        res.redirect(`https://d3p8bgs7s0qr62.cloudfront.net/login?token=${token}`);
    })(req, res, next);
};
// Naver callback Controller
const naverLogin = (req, res, next) => {
    passport_1.default.authenticate('naver', { failureRedirect: '/' }, (err, user, info) => {
        if (err)
            return next(err);
        const { snsId } = user;
        const token = jsonwebtoken_1.default.sign({ snsId }, "scret_realproject", {
            expiresIn: '7d',
        });
        res.redirect(`https://d3p8bgs7s0qr62.cloudfront.net/login?token=${token}`);
    })(req, res, next);
};
exports.default = {
    kakaoLogin,
    googleLogin,
    naverLogin,
};
