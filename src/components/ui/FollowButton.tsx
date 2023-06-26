"use client";
import { HomeUser, ProfileUser } from "@/model/user";
import React from "react";
import useSWR from "swr";
import Button from "./Button";
type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: me, isLoading, error } = useSWR<HomeUser>(`/api/me`);
  const showButton = !isLoading && me && me.username !== username;
  const followText =
    me && me.followings.find((following) => following.username === user.username) ? "Unfollow" : "Follow";
  return <>{showButton && <Button text={followText} onClick={() => {}} red={followText === "Unfollow"} />}</>;
}
