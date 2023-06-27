"use client";
import { ProfileUser } from "@/model/user";
import React from "react";

import Button from "./Button";
import useMe from "@/hooks/useMe";
type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: me, isLoading, error } = useMe();
  const showButton = !isLoading && me && me.username !== username;
  const followText =
    me && me.followings.find((following) => following.username === user.username) ? "Unfollow" : "Follow";
  return <>{showButton && <Button text={followText} onClick={() => {}} red={followText === "Unfollow"} />}</>;
}
