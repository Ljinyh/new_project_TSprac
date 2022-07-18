"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Server
const app_1 = __importDefault(require("./app")); // app.js에서 http 객체 가져오기
// import port from './config/port.json';
const port = 8080;
app_1.default.listen(port, () => {
    console.log(`
    ==========================================
         🥰   {port} server running!   🥰
    ==========================================
    `);
});
