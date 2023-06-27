import React from "react";

import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import ActionBar from "./ui/ActionBar";
import CommentInput from "./ui/CommentInput";
import useSWR from "swr";
import AvatarBadge from "./ui/AvatarBadge";
import GridSpinner from "./ui/icons/GridSpinner";
import PostAvatar from "./ui/PostAvatar";
type Props = {
  post: SimplePost;
};

export default function DetailPost({ post }: Props) {
  const { username, userImage, image, likes, text, createdAt, id } = post;
  const { data, isLoading, error } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(data);
  return (
    <div className=" flex h-full w-full">
      <div className="relative basis-3/5">
        <Image src={image} priority fill sizes="650px" className="" alt={`Photo by ${username}`} />
      </div>

      <div className="basis-2/5 flex flex-col w-full">
        <PostAvatar username={username} image={userImage} />
        <ul className="w-full h-full p-3  grow overflow-auto">
          {isLoading && (
            <li>
              <GridSpinner />
            </li>
          )}
          {comments &&
            comments.length > 0 &&
            comments.map(({ username: commentUsername, image, comment }, index) => (
              <li key={index} className="mb-2 flex items-center gap-1">
                <AvatarBadge highlight={index == 0} image={image} size="small" username={commentUsername} />
                <div className="ml-1">
                  <span className="font-bold mr-1">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar post={post} />
        <CommentInput post={post} />
      </div>
    </div>
  );
}
