import { Request, Response, Router } from "express";
import { User } from "./../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const router = Router();

// 로그인
router.post("/", async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  try {
    const checkUser = await User.findOneBy({ loginId: userId });
    if (!checkUser) return res.status(400).json({ error: "해당 유저가 존재하지 않습니다." });
    const matchPassword = await bcrypt.compare(password, checkUser.password);
    if (!matchPassword) return res.status(401).json({ password: "비밀번호가 틀렸습니다." });
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
    res.set("Set-Cookie", cookie.serialize("token", token, { httpOnly: true, maxAge: 60 * 30, path: "/" }));

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "로그인 과정에서 서버에러" });
  }
});

// 회원가입
router.post("/privacy", async (req: Request, res: Response) => {
  const { userId, userPassword, userName, userEmail, userPhone } = req.body;

  try {
    const checkLoginId = await User.findOneBy({ loginId: userId });
    if (checkLoginId) return res.status(400).json({ error: "중복되는 아이디가 존재합니다." });
    const checkEmail = await User.findOneBy({ email: userEmail });
    if (checkEmail) return res.status(400).json({ error: "중복되는 이메일이 존재합니다." });
    const user = new User();
    user.loginId = userId;
    user.name = userName;
    user.password = userPassword;
    user.email = userEmail;
    user.phoneNumber = userPhone;
    user.rank = "일반";
    await user.save();
    return res.status(200).send("user 저장 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "회원가입 과정에서 서버 에러" });
  }
});

export default router;
