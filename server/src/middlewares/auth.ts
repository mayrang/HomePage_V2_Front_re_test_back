import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ error: "유저 식별 토큰이 없습니다." });
    const email: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!email) return res.status(400).json({ error: "유효한 토큰이 아닙니다.." });
    const user = await User.findOneBy({ email });
    if (!user) return res.status(400).json({ error: "유저 정보를 찾을 수 없습니다." });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "userMiddleware error!" });
  }
};
