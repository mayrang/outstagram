import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};

export default function Button({ text, onClick, red, disabled = false }: Props) {
  return (
    <button
      className={`${red ? "bg-red-400" : "bg-sky-400"} text-white rounded border-none text-lg px-8 py-2 ${
        disabled && "opacity-80"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
