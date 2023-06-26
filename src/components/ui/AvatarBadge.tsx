import React from "react";

type AvatarSize = "large" | "small" | "medium" | "superLarge";

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
        className={`rounded-full object-cover bg-white  ${getImageSizeStyle(size).image}`}
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full overflow-hidden  flex items-center justify-center";
  const { container } = getImageSizeStyle(size);
  const highlightStyle = highlight ? "bg-gradient-to-bl   from-fuchsia-600 via-rose-500 to-amber-300 " : "";
  return `${baseStyle} ${container} ${highlightStyle}`;
}

type ImageSize = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: string): ImageSize {
  switch (size) {
    case "small":
      return { container: "w-9 h-9", image: "w-[34px] h-[34px] p-[0.1rem]" };
    case "medium":
      return { container: "w-11 h-11", image: "w-[42px] h-[42px] p-[0.1rem]" };
    case "large":
      return { container: "w-[68px] h-[68px]", image: "w-16 h-16 p-[0.2rem]" };
    case "superLarge":
      return { container: "w-[152px] h-[152px]", image: "w-[150px] h-[150px] p-[0.3rem]" };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
