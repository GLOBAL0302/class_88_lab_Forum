import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: String,
  create_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

export const Post = mongoose.model('Post', PostSchema);
export default Post;
