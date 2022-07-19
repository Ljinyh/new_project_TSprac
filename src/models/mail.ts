import nodemailer from 'nodemailer';
import 'dotenv/config';
// import senderInfo from '../config/senderInfo.json';
require('dotenv').config();

const mailSender = {
    sendEmail: function(param: { toEmail: any; subject: any; text: any; }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // 메일 보내는 곳
            port: 587,
            host: 'smtp.gmlail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: `${process.env.MAILUSER}`, // 보내는 메일의 주소
                pass: `${process.env.MAILPASS}`, // 보내는 메일의 비밀번호
            },
        });
        // 메일 옵션
        const mailOptions = {
            from: `${process.env.MAILUSER}`, // 보내는 메일의 주소
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            text: param.text, // 메일 내용
        };

        // 메일 발송
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};

export default mailSender;