"use client";
import { User } from "@/model/user";
import React from "react";
import useSWR from "swr";
type Props = {
  user: User;
};

export default function FollowingBar({ user }: Props) {
  console.log(user);
  const { data, isLoading } = useSWR(`/api/following/${user.username}`);

  return <div>Following bar</div>;
}
