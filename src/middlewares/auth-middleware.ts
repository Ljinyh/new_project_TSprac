import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import userDB from "../models/user";

require('dotenv').config();

// import secret from '../config/secret.json';

 const authMiddleWare =  async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = (authorization || "").split(" ");

  if (!tokenValue || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인이 필요한 페이지 입니다.",
    });
    return;
  }
  try {
    let decodetoken = {userId: String, iat: Number, exp: Number};
    decodetoken = <any>jwt.verify(tokenValue, `${process.env.SECRET_KEY as Secret}`);
  
    const userId = decodetoken.userId
    const user = await userDB.findById(userId);

    res.locals.user = user;
    next();
  } catch (error) {
    // 토큰이 없거나, 유효하지 않은 토큰인 경우 이쪽으로 접근.
    res.status(401).send({
      errorMessage: "로그인이 필요한 페이지 입니다.",
    });
    return;
  }
};
export default authMiddleWare;