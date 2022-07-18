"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const request_log_middleware_1 = __importDefault(require("./middlewares/request-log-middleware"));
// ============================
// Router
const index_1 = __importDefault(require("./router/index"));
// ============================
// Passport
const kakaoPassport = require('./passport/kakao'); //이애 연결해주고
// const googlePassport = require('./passport/google');
// const naverPassort = require('./passport/naver');
// ============================
// CORS Access - Origin
const corsOption = {
    origin: ['http://localhost:3000', 'https://d3p8bgs7s0qr62.cloudfront.net'],
    credentials: true,
};
// ============================1
// DB 연결 - log
(0, db_1.default)();
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// ============================
// 서버 어플리케이션
const app = (0, express_1.default)();
// body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
kakaoPassport(); //passport의 kakao.js에서 내보낸 함수 실행
// googlePassport();
// naverPassort();
// 미들웨어
app.use(request_log_middleware_1.default);
app.use((0, cors_1.default)(corsOption));
// ============================
// 최상위 URL
app.get('/', (req, res, next) => {
    res.send("Backend server, Hello there!");
});
// ============================
// 라우터 연결
app.use('/api', index_1.default);
exports.default = app;
