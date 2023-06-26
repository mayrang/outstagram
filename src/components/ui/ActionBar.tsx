"use client";
import React from "react";

import { parseDate } from "@/utils/timeFormat";
import HeartIcon from "./icons/HeartIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import { useSession } from "next-auth/react";
type Props = {
  likes: string[];
  username: string;
  createdAt: Date;
  text?: string;

  postId: string;
};

export default function ActionBar({ likes, username, createdAt, text, postId }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const handleLikes = async () => {
    if (user && likes.find((like) => like === user.username)) {
      await fetch(`/api/likes/${user.id}/${postId}/remove`);
    } else {
      console.log(user);
      fetch(`/api/likes/${user?.id}/${postId}/add`).catch(console.log);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-between my-2 px-4">
        <button onClick={handleLikes}>
          <HeartIcon />
        </button>
        <button>
          <BookmarkIcon />
        </button>
      </div>
      <div className="px-4 py-1">
        <p className="font-bold text-sm mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`} </p>
        {text && (
          <p>
            <span className="font-bold">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
