import React from "react";

type Props = {
  image?: string | null;
  username?: string | null;
  size?: "big" | "small";
};

export default function AvatarBadge({ image, username, size = "small" }: Props) {
  return (
    <div
      className={` rounded-full overflow-hidden ${
        size === "big"
          ? "w-14 h-14"
          : "bg-gradient-to-bl w-9 h-9  from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]"
      }`}
    >
      <img
        src={image || undefined}
        alt={username || "user profile"}
        referrerPolicy="no-referrer"
        className="rounded-full"
      />
    </div>
  );
}
