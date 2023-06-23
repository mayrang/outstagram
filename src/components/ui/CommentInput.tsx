import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
export default function CommentInput() {
  return (
    <form className="border px-3 bg-white py-4 flex items-center justify-between gap-5">
      <BsEmojiSmile className="w-5 h-5 " />
      <input className="outline-none border-none grow text-lg" />
      <button className="text-blue-500 text-lg font-semibold">post</button>
    </form>
  );
}
