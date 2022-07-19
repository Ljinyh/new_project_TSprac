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
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_1 = __importDefault(require("../models/mail"));
const joi_1 = __importDefault(require("joi"));
require("dotenv/config");
require('dotenv').config();
//================================================================================
//회원가입 validation
const UserSchema = joi_1.default.object({
    customerId: joi_1.default.string().min(2).required(),
    email: joi_1.default.string()
        .required()
        .pattern(new RegExp("^[0-9a-zA-Z]+@+[0-9a-zA-Z]+.+[a-zA-Z]$")),
    nickname: joi_1.default.string()
        .required()
        .pattern(new RegExp("^[ㄱ-ㅎ가-힣0-9a-zA-Z]{3,8}$")),
    password: joi_1.default.string()
        .required()
        .pattern(new RegExp("^(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$")),
    birthDay: joi_1.default.string().min(8),
}).unknown(); // 정의되지 않은 key도 허용
// 아이디 validation
const checkUser = joi_1.default.object({
    customerId: joi_1.default.string()
        .required()
        .min(3)
        .max(11)
        .pattern(new RegExp("^[ㄱ-ㅎ가-힣0-9a-zA-Z]{3,11}$"))
        .messages({
        "string.empty": "{{#label}}를 채워주세요.",
        "string.min": `{{#label}}를 최소 3자이상 써주세요!`,
        "string.max": "{{#label}}는 최대 11글자입니다.",
    }),
}).unknown();
//비밀번호 validation
const checkUserPass = joi_1.default.object({
    password: joi_1.default.string()
        .required()
        .min(6)
        .pattern(new RegExp("^(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$"))
        .messages({
        "string.empty": "{{#label}}를 채워주세요.",
        "string.min": `{{#label}}를 최소 6자이상 써주세요!`,
        "string.pattern.base": "특수문자가 들어가야합니다.",
    }),
    confirmPassword: joi_1.default.string().required().min(3).messages({
        "string.empty": "{{#label}} 를 채워주세요.",
        "string.min": "{{#label}}은 최소 3글자 이상입니다.",
    }),
}).unknown();
//이메일 validation
const emailValidation = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .pattern(new RegExp("^[0-9a-zA-Z]+@+[0-9a-zA-Z]+.+[a-zA-Z]$")),
}).unknown();
//================================================================================
//회원가입
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { customerId, email, name, birthDay, nickname, password, faceColor, eyes, } = yield UserSchema.validateAsync(req.body);
        const existNickname = yield user_1.default.findOne({ nickname });
        if (existNickname) {
            return res.status(400).send({ errorMessage: "중복된 닉네임입니다." });
        }
        password = bcrypt_1.default.hashSync(password, 10);
        const users = new user_1.default({
            customerId,
            email,
            nickname,
            name,
            birthDay,
            password,
            faceColor,
            eyes,
        });
        yield users.save();
        res.status(201).send({ message: "회원가입에 성공했습니다." });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});
//================================================================================
//아이디 중복확인API
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = yield checkUser.validateAsync(req.body);
        const existUsers = yield user_1.default.findOne({ customerId });
        if (existUsers) {
            return res.status(400).send({ errorMessage: "중복된 아이디입니다." });
        }
        res.status(200).send({ result: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            result: false,
            errorMessage: "형식에 맞지 않습니다.",
        });
    }
});
//================================================================================
//비밀번호 중복확인API
const PassCehck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword } = yield checkUserPass.validateAsync(req.body);
        if (password !== confirmPassword) {
            return res.status(400).send({
                errorMessage: "비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.",
            });
        }
        res.status(200).send({ result: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ errorMessage: "error" });
    }
});
//================================================================================
// 이메일 중복확인 및 인증번호 메일로 보내기
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = yield emailValidation.validateAsync(req.body);
    const authNum = Math.random().toString().substring(2, 6); //랜덤한 숫자 4자리 생성
    const existUsersEmail = yield user_1.default.findOne({ email });
    if (existUsersEmail) {
        return res.status(400).send({ errorMessage: "중복된 이메일입니다." });
    }
    const emailParam = {
        toEmail: email,
        subject: "Weat 인증번호 발급",
        text: `
                안녕하세요 Weat에서 인증번호 발급을 도와드릴게요!
                인증번호는 <  ${authNum}  > 입니다.
                인증번호 입력란에 입력해 주세요! :)`,
    };
    try {
        if (existUsersEmail) {
            return res.status(400).send({ errorMessage: "중복된 이메일입니다." });
        }
        if (!existUsersEmail) {
            mail_1.default.sendEmail(emailParam);
            res.status(200).send({ msg: `메일 보내기 성공!`, authNum });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            errorMessage: "메세지 전송 실패!",
        });
    }
});
//================================================================================
//로그인
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, password } = req.body;
    const user = yield user_1.default.findOne({ customerId: customerId });
    try {
        if (!customerId || !password) {
            return res.status(400).send({ errorMessage: "입력칸을 채워주세요!" });
        }
        if (!user) {
            return res.status(400).send({ errorMessage: "회원정보가 없습니다!" });
        }
        const userCompared = yield bcrypt_1.default.compare(password, user.password);
        if (!userCompared) {
            return res.status(400).send({
                errorMessage: "아이디나 비밀번호가 올바르지 않습니다.",
            });
        }
        //비밀번호까지 맞다면 토큰을 생성하기.
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
            expiresIn: "3d",
        });
        res.status(200).send({
            message: `${customerId}님이 로그인하셨습니다.`,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            fail: "입력창을 확인 해주세요.",
        });
    }
});
//================================================================================
//아이디 찾기 시 인증번호 이메일로 보내기
const mailSending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const authNum = Math.random().toString().substring(2, 6); //랜덤한 숫자 4자리 생성
    const existUsersEmail = yield user_1.default.findOne({ email: email });
    try {
        if (!existUsersEmail) {
            return res
                .status(400)
                .send({ errorMessage: "등록된 이메일이 없습니다!" });
        }
        else {
            const emailParam = {
                toEmail: email,
                subject: "Weat 인증번호 발급",
                text: `
                    안녕하세요 Weat에서 인증번호 발급을 도와드릴게요!
                    인증번호는 <  ${authNum}  > 입니다.
                    인증번호 입력란에 입력해 주세요! :)`,
            };
            mail_1.default.sendEmail(emailParam);
            res.status(200).send({ msg: "메세지 보내기 성공", authNum });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ result: false, err });
    }
});
//================================================================================
//아이디 찾기
const findUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existUsersEmail = yield user_1.default.findOne({ email: email });
    try {
        if (!existUsersEmail || existUsersEmail === null) {
            return res.status(400).send({ errorMessage: "아이디 찾기 실패!" });
        }
        const name = existUsersEmail.customerId;
        return res.status(200).json({ msg: "아이디 찾기 성공!", name });
    }
    catch (err) {
        res.status(400).send(console.log(err));
    }
});
//================================================================================
//비밀번호 찾기
const findPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, customerId } = req.body;
    //랜덤으로 36진수의 값 만들기(소숫점 뒤부터)
    let tempPassword = Math.random().toString(36).slice(2);
    const existUserPass = yield user_1.default.findOne({ email, customerId });
    if (!existUserPass || existUserPass === null) {
        return res.status(400).send({
            errorMessage: "작성란이 비어있거나 회원등록이 되어있지 않는 사용자입니다.",
        });
    }
    //임시비밀번호 이메일로 전송
    const emailParam = {
        toEmail: email,
        subject: "Weat 임시비밀번호 발급",
        text: `
                안녕하세요 ${existUserPass.nickname}님! 임시비밀번호를 보내드려요!
        
                임시비밀번호는 <  ${tempPassword}  > 입니다.
        
                입력 후 회원정보란에서 꼭 변경해주시길 바랍니다! :)`,
    };
    try {
        mail_1.default.sendEmail(emailParam);
        res.status(200).send({ msg: `메일 보내기 성공!` });
        //메일 보내기
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: "메세지 전송 싪패!" });
    }
    if (existUserPass) {
        //임시로 발급된 비밀번호 암호화
        tempPassword = bcrypt_1.default.hashSync(tempPassword, 10);
        //등록된 비밀번호를 임시비밀번호로 수정
        yield user_1.default.findByIdAndUpdate(existUserPass, {
            $set: { password: tempPassword },
        });
    }
    else {
        return res.status(400).send({ errorMessage: "비밀번호 찾기 실패!" });
    }
});
//================================================================================
//SMS 문자 인증
/*
                    const sendSMS = (req, res) => {
                        const { phoneNum } = req.body;
                        const authNum = Math.random().toString().substring(2, 6);

                        try {
                            if (phoneNum) {
                                send_message(authNum, phoneNum);
                                res.status(200).send({ msg: '문자보내기 성공!', authNum });
                            }
                        } catch (error) {
                            res.status(500).send({ errorMessage: '문자보내기 실패' });
                            console.log(error);
                        }
                    };
                    */
//================================================================================
//유저 정보 수정
const userinfoEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { nickname, name, birthDay, password, faceColor, eyes } = req.body;
    const users = yield user_1.default.findById(userId).exec();
    try {
        if (nickname) {
            const existNickname = yield user_1.default.findOne({ nickname: nickname });
            if (existNickname) {
                return res.status(400).send({ errorMessage: "중복된 닉네임입니다." });
            }
        }
        if (users && !password) {
            yield user_1.default.findByIdAndUpdate({ _id: users._id }, {
                $set: {
                    nickname: nickname,
                    name: name,
                    birthDay: birthDay,
                    faceColor: faceColor,
                    eyes: eyes,
                },
            });
            return res.status(201).json({
                msg: "회원정보가 수정되었습니다.",
            });
        }
        if (users && password) {
            yield user_1.default.findByIdAndUpdate({ _id: users._id }, {
                $set: {
                    nickname: nickname,
                    name: name,
                    birthDay: birthDay,
                    faceColor: faceColor,
                    eyes: eyes,
                    password: bcrypt_1.default.hashSync(password, 10),
                },
            });
            return res.status(201).json({
                msg: "회원정보가 수정되었습니다.",
            });
        }
        res.status(400).send({ errorMessage: "회원정보 수정 실패!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ errorMessage: "예외처리 에러" });
    }
});
//================================================================================
//사용자 인증
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    try {
        return res.status(200).send({
            user: {
                userId: user.userId,
                name: user.name,
                birthDay: user.birthDay,
                email: user.email,
                customerId: user.customerId,
                nickname: user.nickname,
                faceColor: user.faceColor,
                eyes: user.eyes,
                provider: user.provider,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ errorMessage: "회원정보 가져오기 실패" });
    }
});
exports.default = {
    signUp,
    check,
    PassCehck,
    sendMail,
    login,
    mailSending,
    findUserId,
    findPass,
    userinfoEdit,
    userInfo,
};
