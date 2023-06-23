"use client";
import React from "react";
import CloseIcon from "./icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className="fixed  top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center bg-neutral-900/70"
      onClick={(e) => {
        console.log(e.target, e.currentTarget);
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button className="fixed top-32 right-14 text-white">
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
