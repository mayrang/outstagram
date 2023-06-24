import React from "react";
import ModalPortal from "./ui/ModalPortal";
import { Comment, SimplePost } from "@/model/post";
import Image from "next/image";
import ActionBar from "./ui/ActionBar";
import CommentInput from "./ui/CommentInput";
import useSWR from "swr";
import AvatarBadge from "./ui/AvatarBadge";
import GridSpinner from "./ui/icons/GridSpinner";
type Props = {
  post: SimplePost;
};

export default function DetailPost({ post }: Props) {
  const { username, userImage, image, likes, text, createdAt, id } = post;
  const { data: comments, isLoading, error } = useSWR<Comment[]>(`/api/comments/${id}`);
  console.log(comments);
  return (
    <div className=" flex h-full w-full">
      <Image src={image} width={500} height={300} className="basis-2/3 " alt={`Photo by ${username}`} />
      <div className="basis-1/3 flex flex-col">
        <div className="flex items-center gap-2 border-b border-neutral-300 py-3 px-2">
          <AvatarBadge highlight size="medium" image={userImage} username={username} />
          <h4 className="font-bold">{username}</h4>
        </div>

        <ul className="p-3 grow overflow-auto">
          {isLoading && (
            <li>
              <GridSpinner />
            </li>
          )}
          {comments &&
            comments.length > 0 &&
            comments.map(({ username, image, text }, index) => (
              <li key={username} className="mb-2 flex items-center gap-1">
                <AvatarBadge highlight={index == 0} image={image} size="small" username={username} />
                <span className="font-bold">{username}</span>
                <p>{text}</p>
              </li>
            ))}
        </ul>
        <ActionBar likes={likes} createdAt={createdAt} username={username} />
        <CommentInput />
      </div>
    </div>
  );
}
