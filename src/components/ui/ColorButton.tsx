import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  size?: "big" | "small";
};

export default function ColorButton({ text, onClick, size = "small" }: Props) {
  return (
    <div
      className={`bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 rounded-md overflow-hidden ${
        size === "big" ? "p-[0.4rem]" : "p-[0.20rem]"
      }`}
    >
      <button
        onClick={onClick}
        className={`bg-white rounded-sm ${
          size === "big" ? "text-2xl p-4" : "p-[0.3rem] text-base"
        }  hover:bg-opacity-90 transition-opacity`}
      >
        {text}
      </button>
    </div>
  );
}
