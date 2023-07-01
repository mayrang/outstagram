"use client";
import React, { useState } from "react";
import AvatarBadge from "./ui/AvatarBadge";
import { Comment, SimplePost } from "@/model/post";
import DetailPost from "./DetailPost";
import CommentInput from "./ui/CommentInput";
import Image from "next/image";
import ActionBar from "./ui/ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import PostAvatar from "./ui/PostAvatar";
import usePosts from "@/hooks/usePosts";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { username, userImage, text, createdAt, likes, image, id } = post;
  const [modal, setModal] = useState(false);
  const { addComment } = usePosts();
  const handleComment = (comment: Comment) => {
    addComment(comment, post);
  };
  return (
    <>
      {modal && (
        <ModalPortal>
          <PostModal onClose={() => setModal(false)}>
            <DetailPost post={post} />
          </PostModal>
        </ModalPortal>
      )}
      <article className=" rounded-lg bg-white shadow-neutral-50 border border-gray-200 overflow-hidden">
        <PostAvatar username={username} image={userImage} />
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          onClick={() => setModal(true)}
          alt={`photo by ${username}`}
          width={500}
          height={500}
          priority={priority}
        />
        <ActionBar post={post} onComment={handleComment} />
      </article>
    </>
  );
}
