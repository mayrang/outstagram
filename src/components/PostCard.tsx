import React from "react";
import AvatarBadge from "./ui/AvatarBadge";
import { SimplePost } from "@/model/post";

import CommentInput from "./ui/CommentInput";
import Image from "next/image";
import ActionBar from "./ui/ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { username, userImage, text, createdAt, likes, image } = post;
  return (
    <article className=" rounded-lg bg-white shadow-neutral-50 border border-gray-200 overflow-hidden">
      <div className="p-2 flex items-center gap-2">
        <AvatarBadge highlight size="medium" image={userImage} username={username} />
        <span className="font-bold text-gray-900 ">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar likes={likes} text={text} username={username} createdAt={createdAt} />

      <CommentInput />
    </article>
  );
}
