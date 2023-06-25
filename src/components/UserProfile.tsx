import { DetailUser } from "@/model/user";
import React from "react";
import AvatarBadge from "./ui/AvatarBadge";
import Link from "next/link";

type Props = {
  user: DetailUser;
};

export default function UserProfile({ user }: Props) {
  const { id, username, name, followings, followers, image } = user;
  return (
    <Link href={`/user/${username}`} className="p-4 w-full bg-white border flex items-center gap-2">
      <AvatarBadge size="large" username={username} image={image} />
      <div className="flex flex-col">
        <span className="font-bold">{username}</span>
        <span className="text-neutral-500">{name}</span>
        <span className="text-neutral-500">
          {followers ? followers.length : 0} followers {followings ? followings.length : 0} following
        </span>
      </div>
    </Link>
  );
}
