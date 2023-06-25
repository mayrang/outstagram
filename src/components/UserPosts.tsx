"use client";
import { ProfileUser } from "@/model/user";
import React, { useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/icons/GridSpinner";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostGrid from "./PostGrid";
type Props = {
  user: ProfileUser;
};

const KEYWORD_LIST = ["posts", "saved", "liked"];

export default function UserPosts({ user }: Props) {
  const [keyword, setKeyword] = useState<string>(KEYWORD_LIST[0]);

  return (
    <div className="w-full border-t">
      <div className="flex justify-center items-center gap-24 mb-6">
        {KEYWORD_LIST.map((item) => (
          <button
            onClick={() => setKeyword(item)}
            disabled={item === keyword}
            className={` p-4 text-lg uppercase ${keyword === item ? "font-bold border-t border-t-neutral-400" : ""}`}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <PostGrid username={user.username} keyword={keyword} />
    </div>
  );
}
