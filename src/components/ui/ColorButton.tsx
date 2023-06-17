import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  size: string;
};

export default function ColorButton({ text, onClick, size }: Props) {
  return (
    <div className="bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem] rounded-md overflow-hidden ">
      <button onClick={onClick} className={`bg-white rounded-sm ${size} p-[0.3rem] transition-opacity`}>
        {text}
      </button>
    </div>
  );
}
