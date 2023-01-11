import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "./../entity/User";

const router = Router();

router.get("/privacy", async (req: Request, res: Response) => {
  const { token, id } = req.body;
  if (!token) return res.status(400).json({ error: "유저 식별 토큰이 없습니다." });
  const { loginId }: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findOneBy({ loginId });
  //console.log(user)
  if (!user) throw new Error("로그인 유저 정보가 없습니다.");

  return res.status(200).json({ userName: user.name });
});
