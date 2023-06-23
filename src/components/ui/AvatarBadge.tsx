import React from "react";

type AvatarSize = "large" | "small" | "medium";

type Props = {
  image?: string | null;
  username?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function AvatarBadge({ image, username, size = "large", highlight = false }: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        src={image || undefined}
        alt={username || "user profile"}
        referrerPolicy="no-referrer"
        className={`rounded-full object-cover bg-white ${getImageStyle(size)}`}
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full overflow-hidden  flex items-center justify-center";
  const sizeStyle = getContainerSize(size);
  const highlightStyle = highlight ? "bg-gradient-to-bl   from-fuchsia-600 via-rose-500 to-amber-300 " : "";
  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
  }
}

function getImageStyle(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
  }
}
