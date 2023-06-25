"use client";
import { DetailUser, ProfileUser } from "@/model/user";
import React from "react";
import useSWR from "swr";
import AvatarBadge from "./ui/AvatarBadge";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { data: me, isLoading, error } = useSWR<DetailUser>(`/api/me`);
  const checkFollowing = me?.followings.find((following) => following.username === user.username);
  return (
    <div className="flex w-full items-center py-16 gap-10 justify-center">
      <AvatarBadge highlight username={user.username} size="superLarge" image={user.image} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <p className="text-2xl">{user.username}</p>
          {checkFollowing ? (
            <button className="bg-red-400 text-white rounded border-none text-lg px-4 py-1">Unfollow</button>
          ) : (
            me && <button className="bg-blue-400 text-white rounded border-none text-lg px-4 py-1">Follow</button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span>{user.posts} posts</span>
          <span>{user.followers} followers</span>
          <span>{user.followings} followings</span>
        </div>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
    </div>
  );
}
