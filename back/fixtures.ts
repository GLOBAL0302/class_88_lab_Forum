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

  const [user1_post1, user1_post2, user2_post1, user2_post2] = await Post.create(
    {
      title: 'Golden mountain',
      description: 'Found Golden Mountain',
      user: user_1,
      image: '',
      create_at: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Bank Robbery',
      description: 'it happened on sunday',
      user: user_1,
      image: '',
      create_at: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Tramp cancelled CBP',
      description: 'there are now 1000 of people at the border',
      user: user_2,
      image: '',
      create_at: '2021-05-01T00:12:34.000Z',
    },
    {
      title: "California caught Fire",
      description: 'there was really messy around',
      user: user_2,
      image: '',
      create_at: '2021-05-01T00:12:34.000Z',
    },
  );

  const [comment_1, comment_2] = await Comment.create(
    {
      user: user_1,
      post: user1_post1,
      description: 'Incredible Golden Mountain',
    },
    {
      user: user_2,
      post: user1_post1,
      description: 'now everybody will go there',
    },
    {
      user: user_1,
      post: user1_post2,
      description: 'good I was off that day',
    },
    {
      user: user_2,
      post: user1_post2,
      description: 'Oh yes I had mortgage at that bank',
    },
    {
      user: user_1,
      post: user2_post1,
      description: 'Well maybe that is for good',
    },
    {
      user: user_2,
      post: user2_post1,
      description: 'who knows man',
    },
    {
      user: user_1,
      post: user2_post2,
      description: 'Everybody started looting staff',
    },
    {
      user: user_2,
      post: user2_post2,
      description: 'Yes that is damn not right',
    },
  );

  await db.close();
};

run().catch((err) => {
  console.error(err);
});
