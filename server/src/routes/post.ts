import { IsNumberString } from "class-validator";
import { query, Request, Response, Router } from "express";
import { Comment } from "../entity/Comment";
import { Post } from "./../entity/Post";
import { userMiddleware } from "./../middlewares/auth";

const router = Router();

// 포스트 생성
router.post("/", userMiddleware, async (req: Request, res: Response) => {
  const { category, title, main } = req.body;

  try {
    const user = res.locals.user;
    const post = new Post();
    post.title = title;
    post.user = user;
    post.content = main;
    post.category = category;
    await post.save();
    return res.status(200).send("저장 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "post 저장과정에서 서버 에러" });
  }
});

// 포스트 수정
router.post("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { category, title, updateTime, userId } = req.body;
  try {
    const checkPost = await Post.findOneBy({ postId: parseInt(postId) });
    checkPost.category = category;
    checkPost.title = title;
    checkPost.postTime = updateTime;
    await checkPost.save();
    return res.status(200).send("수정 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Post 수정 과정에서 서버 에러" });
  }
});

// 포스트 삭제
router.delete("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOneBy({ postId: parseInt(postId) });
    await post.remove();
    return res.status(200).send("삭제 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Post 삭제 과정에서 서버 에러" });
  }
});

// 댓글 생성
router.post("/:id/comment", userMiddleware, async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { main, parentId } = req.body;
  try {
    const user = res.locals.user;
    const post = await Post.findOneBy({ postId: parseInt(postId) });
    const comment = new Comment();
    comment.content = main;
    if (parentId) {
      comment.parentId = parentId;
    }
    comment.post = post;
    comment.user = user;
    await comment.save();
    return res.status(200).send("Comment 생성 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Comment 생성 과정에서 서버 에러" });
  }
});

// 댓글 수정
router.post("/:id/comment/:commentId", userMiddleware, async (req: Request, res: Response) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const { main } = req.body;
  try {
    const comment = await Comment.findOneBy({ commentId: parseInt(commentId) });
    comment.content = main;
    await comment.save();
    return res.status(200).send("Comment 수정 성공");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Comment 수정 과정에서 서버 에러" });
  }
});

// 포스트 조회
router.get("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const queryPost = await Post.findOne({
      where: {
        postId: parseInt(postId),
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          userId: true,
          name: true,
        },
        category: true,
        title: true,
        postTime: true,
        userId: true,
        content: true,
      },
    });
    const queryComments = await Comment.find({
      where: {
        postId: parseInt(postId),
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          userId: true,
          name: true,
        },
        content: true,
        parentId: true,
        postTime: true,
      },
    });
    const post = {
      ...queryPost,
      user: {
        ...queryPost.user,
        id: queryPost.user.userId,
      },
    };

    const comments = queryComments.map((comment) => ({
      ...comment,
      main: comment.content,
      user: {
        ...comment.user,
        id: comment.user.userId,
      },
    }));
    return res.status(200).json({ post, comments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "post 조회과정에서 서버에러" });
  }
});

// 포스트 목록 조회
router.get("/:category", async (req: Request, res: Response) => {
  const category = req.params.category;

  try {
    let queryPosts = await Post.find({
      where: {
        category,
      },
      relations: {
        user: true,
      },
      select: {
        postId: true,
        title: true,
        user: {
          userId: true,
          name: true,
        },
        postTime: true,
      },
      order: {
        postTime: "DESC",
      },
    });

    const posts = queryPosts.map((post) => ({
      ...post,
      id: post.postId,
      user: { id: post.user.userId, ...post.user },
    }));
    return res.json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "목록 조회과정에서 서버 에러" });
  }
});

export default router;
