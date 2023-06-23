import { SimpleUser } from "./user";

export type Post = {
  _id: string;
  author: SimpleUser;
  _createdAt: Date;
  _updatedAt: Date;
  photo: {
    asset: {
      _ref: string;
    };
    _type: string;
  };
  comment: SimpleComment;
  likes: number | null;
};

export type SimpleComment = {
  username: string;
  content: string;
};
