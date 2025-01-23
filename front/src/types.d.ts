export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  user: IUser;
  image: File | null;
  create_at: string;
}

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}

export interface IPostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComments {
  _id: string;
  user: IUser;
  post: IPost;
  description: string;
}
export interface ICommentMutation {
  description: string;
  post: string;
}
