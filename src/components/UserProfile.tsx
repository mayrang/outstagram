"use client";
import { ProfileUser } from "@/model/user";
import React from "react";

import AvatarBadge from "./ui/AvatarBadge";
import FollowButton from "./ui/FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { username, image, posts, followers, followings, name } = user;
  const info = [
    { title: "posts", data: posts },
    { title: "followers", data: followers },
    { title: "followings", data: followings },
  ];
  return (
    <section className="flex w-full items-center flex-col md:flex-row py-12 border-b border-neutral-300  justify-center">
      <AvatarBadge highlight username={username} size="superLarge" image={image} />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <p className="text-2xl md:mr-8 my-4 md:mb-0">{username}</p>
          <FollowButton user={user} />
        </div>

        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
