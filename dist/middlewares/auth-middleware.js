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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
require('dotenv').config();
// import secret from '../config/secret.json';
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" ");
    if (!tokenValue || tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요한 페이지 입니다.",
        });
        return;
    }
    try {
        let decodetoken = { userId: String, iat: Number, exp: Number };
        decodetoken = jsonwebtoken_1.default.verify(tokenValue, `${process.env.SECRET_KEY}`);
        const userId = decodetoken.userId;
        const user = yield user_1.default.findById(userId);
        res.locals.user = user;
        next();
    }
    catch (error) {
        // 토큰이 없거나, 유효하지 않은 토큰인 경우 이쪽으로 접근.
        res.status(401).send({
            errorMessage: "로그인이 필요한 페이지 입니다.",
        });
        return;
    }
});
exports.default = authMiddleWare;
