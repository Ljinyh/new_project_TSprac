"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const socialRouter_1 = __importDefault(require("./socialRouter"));
const router = (0, express_1.default)();
router.use('/users', userRouter_1.default);
router.use('/auth', socialRouter_1.default);
exports.default = router;
