export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  text: string;
};

export type Comment = {
  username: string;
  text: string;
  image: string;
};
