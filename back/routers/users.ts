import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    res.status(200).send({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send({ error: 'User not found' });
      return;
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: 'password is incorrect' });
      return;
    }

    user.generateToken();
    await user.save();
    res.status(200).send({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
  let reqWithUser = req as RequestWithUser;
  let userFromAuth = reqWithUser.user;
  try {
    const user = await User.findOne({ _id: userFromAuth._id });

    if (user) {
      user.generateToken();
      await user.save();
      res.status(200).send({ message: 'User log out successfully' });
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
