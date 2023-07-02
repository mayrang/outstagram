import React, { createContext, useContext } from "react";

type CacheKeys = {
  postsKey: string;
};

export const PostsContext = createContext<CacheKeys>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(PostsContext);
