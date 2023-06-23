"use client";
import React from "react";
import useSWR from "swr";
import PostCard from "./PostCard";

import { SimplePost } from "@/model/post";
import GridSpinner from "./ui/icons/GridSpinner";

export default function PostList() {
  const { data, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {data && data.length > 0 && (
        <ul>
          {data.map((post, index) => (
            <li className="mb-2" key={post.id}>
              <PostCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
