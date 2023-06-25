export type User = {
  username: string;
  name: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;

export type DetailUser = User & {
  followings: SimpleUser[];
  followers: SimpleUser[];
  id: string;
  bookmarks: string[];
};

export type ProfileUser = User & {
  followers: number;
  followings: number;
};
