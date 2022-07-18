import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './database/db';
import reqLogMiddleware from './middlewares/request-log-middleware';
require('dotenv').config();
// ============================
// Router
import indexRouter from './router/index';

// ============================
// Passport
import kakaoPassport from './passport/kakao'; //이애 연결해주고
import googlePassport from './passport/google';

// ============================
// CORS Access - Origin
const corsOption = {
    origin: [ process.env.CORSORIGIN_1 as string, process.env.CORSORIGIN_2 as string ],
    credentials: true,
};

// ============================1
// DB 연결 - log
connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ============================
// 서버 어플리케이션
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
kakaoPassport(); //passport의 kakao.js에서 내보낸 함수 실행
googlePassport();

// 미들웨어
app.use(reqLogMiddleware);
app.use(cors(corsOption));

// ============================
// 최상위 URL
app.get('/' ,(req: Request, res: Response , next: NextFunction) => {
    res.send("Backend server, Hello there!");
});

// ============================
// 라우터 연결
app.use('/api', indexRouter);


export default app;