import express from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Comment from '../models/Comment';
import post from '../models/Post';

const commentsRouter = express.Router();

commentsRouter.get('/:postId', auth, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId });
    res.status(200).send(comments);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

commentsRouter.post('/:postId', auth, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const comment = new Comment({
      user: user._id,
      post: postId,
      description: req.body.description,
    });

    await comment.save();
    res.status(200).send({ comment });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

export default commentsRouter;
