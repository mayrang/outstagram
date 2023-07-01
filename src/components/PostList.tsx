"use client";
import React from "react";
import useSWR from "swr";
import PostCard from "./PostCard";

import { SimplePost } from "@/model/post";
import GridSpinner from "./ui/icons/GridSpinner";
import usePosts from "@/hooks/usePosts";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && posts.length > 0 && (
        <ul>
          {posts.map((post, index) => (
            <li className="mb-2" key={post.id}>
              <PostCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
