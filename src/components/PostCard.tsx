"use client";
import React, { useState } from "react";
import AvatarBadge from "./ui/AvatarBadge";
import { SimplePost } from "@/model/post";
import DetailPost from "./DetailPost";
import CommentInput from "./ui/CommentInput";
import Image from "next/image";
import ActionBar from "./ui/ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import PostAvatar from "./ui/PostAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { username, userImage, text, createdAt, likes, image, id } = post;
  const [modal, setModal] = useState(false);
  console.log(text);
  return (
    <>
      {modal && (
        <ModalPortal>
          <PostModal onClose={() => setModal(false)}>
            <DetailPost post={post} />
          </PostModal>
        </ModalPortal>
      )}
      <article
        onClick={() => setModal(true)}
        className=" rounded-lg bg-white shadow-neutral-50 border border-gray-200 overflow-hidden"
      >
        <PostAvatar username={username} image={userImage} />
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          alt={`photo by ${username}`}
          width={500}
          height={500}
          priority={priority}
        />
        <ActionBar post={post} />

        <CommentInput />
      </article>
    </>
  );
}
