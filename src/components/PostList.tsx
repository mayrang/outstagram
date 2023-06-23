"use client";
import { Post } from "@/model/post";
import React from "react";
import useSWR from "swr";
import PostCard from "./PostCard";
export default function PostList() {
  const { data, isLoading, error } = useSWR<Post[]>("/api/posts");
  console.log("posts", data);
  return (
    <section className="w-full flex flex-col items-center gap-4">
      {data && data.length > 0 && data.map((post) => <PostCard key={post._id} post={post} />)}
    </section>
  );
}
