import mongoose, { HydratedDocument, Model } from 'mongoose';
import { IUserField } from '../types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

interface IUserMethods {
  checkPassword(password: string): Promise<Boolean>;
  generateToken(): void;
}

type IUserModel = Model<IUserField, {}, IUserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTORY = 10;

const UserSchema = new Schema<HydratedDocument<IUserField>, IUserModel, IUserMethods>({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<IUserField>, value: string): Promise<boolean> {
        if (!this.isModified('username')) return true;
        const user: IUserField | null = await User.findOne({ username: value });
        return !user;
      },
      message: 'This username is required',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
});

UserSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  this.token = randomUUID();
};

const User = mongoose.model('User', UserSchema);
export default User;
