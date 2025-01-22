import express from 'express';
import { Error } from 'mongoose';
import Post from '../models/Post';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const id = req.query.postId;
    let filter = id ? { _id: id } : {};
    const posts = await Post.find(filter).populate('user');
    res.status(200).send(posts);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const expressReq = req as RequestWithUser;
  const user = expressReq.user;
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      user: user._id,
      image: req.file ? 'images' + req.file.filename : null,
      created_at: new Date().toISOString(),
    });
    await post.save();
    res.status(200).send({ post });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

export default postsRouter;
