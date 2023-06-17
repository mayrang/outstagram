import React from "react";

type Props = {
  image?: string | null;
  username?: string | null;
};

export default function AvatarBadge({ image, username }: Props) {
  return (
    <div className="bg-gradient-to-bl w-9 h-9  from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem] rounded-full overflow-hidden ">
      <img
        src={image || undefined}
        alt={username || "user profile"}
        referrerPolicy="no-referrer"
        className="rounded-full"
      />
    </div>
  );
}
