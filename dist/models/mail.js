"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
// import senderInfo from '../config/senderInfo.json';
require('dotenv').config();
const mailSender = {
    sendEmail: function (param) {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            port: 587,
            host: 'smtp.gmlail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: `${process.env.MAILUSER}`,
                pass: `${process.env.MAILPASS}`, // 보내는 메일의 비밀번호
            },
        });
        // 메일 옵션
        const mailOptions = {
            from: `${process.env.MAILUSER}`,
            to: param.toEmail,
            subject: param.subject,
            text: param.text, // 메일 내용
        };
        // 메일 발송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};
exports.default = mailSender;
