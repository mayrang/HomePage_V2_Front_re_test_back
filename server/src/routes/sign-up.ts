import { Request, Response, Router } from "express";
import { User } from './../entity/User';



const router = Router();

router.post("privacy", async (req:Request, res:Response) => {
  const {userId, userPassword, userName, userEmail, userPhone} = req.body;

  try{
    const checkLoginId = await User.findOneBy({loginId: userId});
    if(checkLoginId) return res.status(400).json({error: "중복되는 아이디가 존재합니다."});
    const checkEmail = await User.findOneBy({email: userEmail});
    if(checkEmail) return res.status(400).json({error: "중복되는 이메일이 존재합니다."});
    const user = new User();
    user.loginId = userId;
    user.name = userName;
    user.password = userPassword;
    user.email = userEmail;
    user.phoneNumber = userPhone;
    user.rank = "일반";
    await user.save();
    return res.status(200).send("user 저장 성공");

  }catch(err){
    console.log(err);
    return res.status(500).json({error: "회원가입 과정에서 서버 에러"})
  }
})