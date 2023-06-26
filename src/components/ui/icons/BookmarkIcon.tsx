import React from "react";

type Props = {
  className?: string;
};

import { FaRegBookmark } from "react-icons/fa";
export default function BookmarkIcon({ className }: Props) {
  return <FaRegBookmark className={`${className || "w-6 h-6"}`} />;
}
