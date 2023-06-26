export type AuthUser = {
  username: string;
  name: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type HomeUser = AuthUser & {
  followings: SimpleUser[];
  followers: SimpleUser[];
  id: string;
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  followers: number;
  followings: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
