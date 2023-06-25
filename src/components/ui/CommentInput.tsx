import React from "react";
import SmileIcon from "./icons/SmileIcon";

export default function CommentInput() {
  return (
    <form className="border-t px-3 border-neutral-300  bg-white flex items-center  ">
      <SmileIcon />
      <input placeholder="input comment.." className="outline-none border-none w-full ml-2 p-3 text-lg" />
      <button className="text-sky-500  ml-2 font-bold">post</button>
    </form>
  );
}
