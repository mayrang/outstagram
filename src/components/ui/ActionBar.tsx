"use client";
import React from "react";

import { parseDate } from "@/utils/timeFormat";
import HeartIcon from "./icons/HeartIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import { useSession } from "next-auth/react";
import ToggleButton from "./ToggleButton";
import usePosts from "@/hooks/usePosts";
import { Comment, SimplePost } from "@/model/post";
import HeartFillIcon from "./icons/HeartFillIcon";
import useMe from "@/hooks/useMe";
import BookmarkFillIcon from "./icons/BookmarkFillIcon";
import CommentInput from "./CommentInput";
type Props = {
  post: SimplePost;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, onComment }: Props) {
  const { likes, username, createdAt, text, id } = post;
  const { user, setBookmarks } = useMe();
  const like = user ? likes.includes(user.username) : false;
  const bookmark = user ? user.bookmarks.includes(id) : false;
  const { setLikes } = usePosts();
  const handleLikes = (like: boolean) => {
    user && setLikes(post, user.username, like);
  };
  const handleBookmarks = (bookmark: boolean) => {
    user && setBookmarks(user, id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };
  return (
    <>
      <div className=" flex items-center justify-between my-2 px-4">
        <ToggleButton onToggle={handleLikes} toggle={like} onIcon={<HeartFillIcon />} offIcon={<HeartIcon />} />
        <ToggleButton
          onToggle={handleBookmarks}
          toggle={bookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
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

      <CommentInput onComment={handleComment} />
    </>
  );
}
