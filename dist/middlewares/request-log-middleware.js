"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};
exports.default = requestMiddleware;
