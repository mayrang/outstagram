"use client";
import React from "react";

import { parseDate } from "@/utils/timeFormat";
import HeartIcon from "./icons/HeartIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import { useSession } from "next-auth/react";
import ToggleButton from "./ToggleButton";
import usePosts from "@/hooks/usePosts";
import { SimplePost } from "@/model/post";
import HeartFillIcon from "./icons/HeartFillIcon";
type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { likes, username, createdAt, text } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const like = user ? likes.includes(user.username) : false;
  const { setLikes } = usePosts();
  const handleLikes = (like: boolean) => {
    if (user) {
      setLikes(post, user.username, like);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-between my-2 px-4">
        <ToggleButton onToggle={handleLikes} toggle={like} onIcon={<HeartFillIcon />} offIcon={<HeartIcon />} />
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
