import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import { randomUUID } from 'node:crypto';
import Comment from './models/Comment';
import bcrypt from 'bcrypt';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
    console.error(e);
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'beka',
      password: '123',
      token: randomUUID(),
    },
    {
      username: 'kuba',
      password: '321',
      token: randomUUID(),
    },
  );

  const [post_1, post_2] = await Post.create(
    {
      title: 'Golden mountain',
      description: 'Found Golden Mountain',
      user: user_1,
      image: '',
      create_at: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'iron Mountain',
      description: 'Found iron Mountain',
      user: user_2,
      image: '',
      create_at: '2021-05-01T00:12:34.000Z',
    },
  );

  const [comment_1, comment_2] = await Comment.create(
    {
      user: user_1,
      post: post_1,
      description: 'Incredible Golden Mountain',
    },
    {
      user: user_2,
      post: post_2,
      description: 'Incredible Iron Mountain',
    },
  );

  await db.close();
};

run().catch((err) => {
  console.error(err);
});
