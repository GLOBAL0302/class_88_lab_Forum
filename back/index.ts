import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import postsRouter from './routers/posts';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((err) => {
  console.error(err);
});
