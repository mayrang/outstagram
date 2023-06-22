import React from "react";

type Props = {
  image?: string | null;
  username?: string | null;
  size?: "normal" | "small";
  highlight?: boolean;
};

export default function AvatarBadge({ image, username, size = "normal", highlight = false }: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        src={image || undefined}
        alt={username || "user profile"}
        referrerPolicy="no-referrer"
        className={getImageStyle(size)}
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = "rounded-full overflow-hidden  flex items-center justify-center";
  const sizeStyle = size === "normal" ? "w-[68px] h-[68px]" : "w-9 h-9";
  const highlightStyle = highlight ? "bg-gradient-to-bl   from-fuchsia-600 via-rose-500 to-amber-300 " : "";
  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getImageStyle(size: string): string {
  const baseStyle = "rounded-full object-cover bg-white";
  const sizeStyle = size === "small" ? "w-[34px] h-[34px] p-[0.1rem]" : "w-16 h-16 p-[0.2rem]";
  return `${baseStyle} ${sizeStyle}`;
}
