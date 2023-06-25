import { SearchUser } from "@/model/user";
import React from "react";
import AvatarBadge from "./ui/AvatarBadge";
import Link from "next/link";

type Props = {
  user: SearchUser;
};

export default function UserCard({ user }: Props) {
  const { username, name, followings, followers, image } = user;
  return (
    <Link
      href={`/user/${username}`}
      className="p-4 w-full bg-white border flex items-center gap-2 border-neutral-300 hover:bg-neutral-50"
    >
      <AvatarBadge size="large" username={username} image={image} />
      <div className="text-neutral-500">
        <p className="text-bold">{username}</p>
        <p>{name}</p>
        <p className="text-sm">
          {followers} followers {followings} following
        </p>
      </div>
    </Link>
  );
}
