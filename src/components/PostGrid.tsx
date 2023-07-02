"use client";
import useSWR from "swr";
import React from "react";
import { SimplePost } from "@/model/post";
import GridSpinner from "./ui/icons/GridSpinner";
import PostGridCard from "./PostGridCard";

import usePosts from "@/hooks/usePosts";

export default function PostGrid() {
  const { posts, isLoading, error } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-3 gap-2 w-full py-4 px-8">
          {posts.map((post, index) => (
            <PostGridCard key={post.id} post={post} priority={index < 7} />
          ))}
        </div>
      )}
    </div>
  );
}
