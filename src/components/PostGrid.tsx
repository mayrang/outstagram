"use client";
import useSWR from "swr";
import React from "react";
import { SimplePost } from "@/model/post";
import GridSpinner from "./ui/icons/GridSpinner";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  keyword: string;
};

export default function PostGrid({ username, keyword }: Props) {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${keyword}`);
  return (
    <>
      {isLoading && (
        <div className="w-full mt-16 flex justify-center">
          <GridSpinner />
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-3 gap-2 w-full ">
          {posts.map((post) => (
            <PostGridCard post={post} />
          ))}
        </div>
      )}
    </>
  );
}
