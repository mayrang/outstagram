import React from "react";
import AvatarBadge from "./AvatarBadge";

type Props = {
  image: string;
  username: string;
};

export default function PostAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-300 py-3 px-2">
      <div>
        <AvatarBadge highlight size="medium" image={image} username={username} />
      </div>

      <h4 className="font-bold">{username}</h4>
    </div>
  );
}
