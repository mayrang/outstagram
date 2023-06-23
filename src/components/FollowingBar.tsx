"use client";
import { DetailUser } from "@/model/user";
import React from "react";
import useSWR from "swr";
import AvatarBadge from "./ui/AvatarBadge";
import { PropagateLoader } from "react-spinners";
import ScrollableBar from "./ui/ScrollableBar";
import Link from "next/link";

export default function FollowingBar() {
  const { data, isLoading } = useSWR<DetailUser>(`/api/me`);
  const followings = data?.followings && [...data.followings, ...data.followings, ...data.followings];

  return (
    <section className="flex items-center justify-center w-full min-h-[90px]  border shadow-md shadow-neutral-300 rounded-lg mb-4 p-4">
      {isLoading ? (
        <PropagateLoader color="#FF0000" />
      ) : (
        (!followings || followings.length === 0) && <p>팔로잉한 유저가 없습니다.</p>
      )}
      {followings && followings.length > 0 && (
        <ScrollableBar>
          {followings.map(({ image, username }) => (
            <Link href={`/user/${username}`} className=" flex flex-col items-center w-20" key={username}>
              <AvatarBadge highlight image={image} username={username} size="large" />
              <span className="text-sm w-full text-ellipsis overflow-hidden text-center">{username}</span>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
