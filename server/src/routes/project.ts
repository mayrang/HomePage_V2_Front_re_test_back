import { Request, Response, Router } from "express";
import { Project } from "../entity/Project";
import { Post } from "./../entity/Post";
import { userMiddleware } from "./../middlewares/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({
      select: {
        title: true,
        state: true,
        postTime: true,
      },
    });
    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "프로젝트 목록 불러오는 과정에서 서버 에러" });
  }
});

router.get("/introduce/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const projectIntroduce = await Project.findOne({
      where: {
        projectId: parseInt(id),
      },
      select: {
        title: true,
        content: true,
        projectFile: true,
        postTime: true,
        state: true,
      },
    });
    const introduce = {
      ...projectIntroduce,
      file: projectIntroduce.projectFile,
    };
    return res.status(200).json(introduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "프로젝트 소개 불러오는 과정에서 서버 에러" });
  }
});

router.get("/:postCategory", async (req: Request, res: Response) => {
  const postCategory = req.params.postCategory;
  try {
    const projectPostLIst = await Post.find({
      where: {
        category: postCategory,
      },
      select: {
        title: true,
        postTime: true,
      },
      order: {
        postTime: "DESC",
      },
    });
    return res.status(200).send(projectPostLIst);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "프로젝트 진행도 목록 불러오는 과정에서 서버 에러" });
  }
});

router.get("/:postCategory/:id", async (req: Request, res: Response) => {
  const { postCategory, id } = req.params;
  try {
    const projectPost = await Post.findOne({
      where: {
        category: postCategory,
        postId: parseInt(id),
      },
      select: {
        title: true,
        content: true,
        postTime: true,
        file: true,
      },
    });
    return res.status(200).json(projectPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "프로젝트 포스트 불러오는 과정에서 서버 에러" });
  }
});

// router.post("/:id/apply", )

router.post("/introduce", async (req: Request, res: Response) => {
  const { title, content, file, postTime, state } = req.body;
  try {
    // const user = res.locals.user;
    const newIntroduce = new Project();
    newIntroduce.title = title;
    newIntroduce.content = content;
    newIntroduce.projectFile = file;
    newIntroduce.postTime = postTime;
    newIntroduce.state = state;
    await newIntroduce.save();
    return res.status(200).send("소개 저장 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "프로젝트 소개 생성 과정에서 서버 에러" });
  }
});

export default router;
