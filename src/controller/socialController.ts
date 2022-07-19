import { Response, Request, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import passport from 'passport';
require('dotenv').config();

//Kakao callback Controller
const kakaoLogin = (req: Request, res:Response, next:NextFunction) => {
    passport.authenticate(
        'kakao', { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err);
            const { userId } = user;

            const token = jwt.sign({ userId }, process.env.SECRET_KEY as Secret, {
                expiresIn: '7d',
            });
            res.redirect(`http://localhost:3000/login?token=${token}`);
        }
    )(req, res, next);
};

// Google callback Controller
const googleLogin = (req: Request, res:Response, next:NextFunction) => {
    passport.authenticate(
        'google', { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err);
            const { snsId } = user;
            const token = jwt.sign({ snsId }, process.env.SECRET_KEY as Secret, {
                expiresIn: '7d',
            });

            res.redirect(
                `https://d3p8bgs7s0qr62.cloudfront.net/login?token=${token}`
            );
        }
    )(req, res, next);
};

export default {
    kakaoLogin,
    googleLogin,
}