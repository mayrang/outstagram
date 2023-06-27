import React, { FormEvent, useState } from "react";
import SmileIcon from "./icons/SmileIcon";
import usePosts from "@/hooks/usePosts";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";

type Props = {
  post: SimplePost;
};

export default function CommentInput({ post }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const [comment, setComment] = useState("");
  const { addComment } = usePosts();

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    } else if (!user) {
      return;
    }
    addComment(comment, post).then(() => setComment(""));
  };
  return (
    <form onSubmit={handleComment} className="border-t px-3 border-neutral-300  bg-white flex items-center  ">
      <SmileIcon />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="input comment.."
        className="outline-none border-none w-full ml-2 p-3 text-lg"
      />
      <button disabled={comment.trim() === ""} className="text-sky-500  ml-2 font-bold">
        post
      </button>
    </form>
  );
}
