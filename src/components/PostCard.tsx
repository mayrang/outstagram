import React from "react";
import AvatarBadge from "./ui/AvatarBadge";
import { Post } from "@/model/post";
import { urlFor } from "@/service/image";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import TimeAgo from "./ui/TimeAgo";
import CommentInput from "./ui/CommentInput";
type Props = {
  post: Post;
};

export default function PostCard({
  post: {
    _updatedAt,
    author,
    likes,
    photo,
    _createdAt,
    comment: { content },
  },
}: Props) {
  const likeCount = likes || 0;
  return (
    <article className="w-full rounded-lg bg-white shadow-neutral-50 border overflow-hidden">
      <div className="p-2 flex items-center gap-2">
        <AvatarBadge highlight size="small" image={author.image} username={author.username} />
        <span className="font-bold">{author.username}</span>
      </div>
      <img className="w-full" src={urlFor(photo).width(400).height(400).url()} alt="image" />
      <div className="p-4 flex flex-col gap-2">
        <div className=" flex items-center justify-between">
          <button>
            <AiOutlineHeart className="w-7 h-7" />
          </button>
          <button>
            <FaRegBookmark className="w-6 h-6" />
          </button>
        </div>
        <span className="font-semibold text-sm">{`${likeCount} ${likeCount > 1 ? "likes" : "like"}`} </span>
        <div className="flex items-center gap-2">
          <span className="font-bold">{author.username}</span>
          <p>{content}</p>
        </div>
        <TimeAgo date={_updatedAt || _createdAt} />
      </div>
      <CommentInput />
    </article>
  );
}
