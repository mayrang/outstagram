"use client";
import { ProfileUser } from "@/model/user";
import React, { useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/icons/GridSpinner";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostGrid from "./PostGrid";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
type Props = {
  user: ProfileUser;
};

const KEYWORD_LIST = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="w-4 h-4" /> },
  { type: "liked", icon: <HeartIcon className="w-4 h-4" /> },
];

export default function UserPosts({ user }: Props) {
  const [keyword, setKeyword] = useState<string>(KEYWORD_LIST[0].type);

  return (
    <div className="w-full border-t">
      <ul className="flex justify-center items-center uppercase gap-24 mb-6">
        {KEYWORD_LIST.map(({ type, icon }) => (
          <li
            onClick={() => setKeyword(type)}
            className={`mx-12 p-4 cursor-pointer border-black ${type === keyword && "font-bold border-t"}`}
            key={type}
          >
            <button disabled={type === keyword} className={`scale-150 md:scale-100 p-4 text-lg`} key={type}>
              {icon}
            </button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={user.username} keyword={keyword} />
    </div>
  );
}
