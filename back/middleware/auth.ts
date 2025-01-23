import { HydratedDocument } from 'mongoose';
import { IUserField } from '../types';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUserField>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;

  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send('Token not provided');
    return;
  }

  const user = await User.findOne({ token });

  if (!user) {
    res.status(401).send('Token is incorrect');
    return;
  }
  req.user = user;
  next();
};

export default auth;
