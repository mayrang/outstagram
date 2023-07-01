"use client";
import { ProfileUser } from "@/model/user";
import React, { useState, useTransition } from "react";

import Button from "./Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username, id } = user;
  const { user: me, isLoading, error, setFollowings } = useMe();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isFetching || isPending;
  const showButton = !isLoading && me && me.username !== username;
  const followText =
    me && me.followings.find((following) => following.username === user.username) ? "Unfollow" : "Follow";
  const handleFollowings = async () => {
    setIsFetching(true);
    await setFollowings(id, followText === "Follow");
    startTransition(() => {
      router.refresh();
    });
    setIsFetching(false);
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute flex items-center justify-center inset-0">
              <PulseLoader size={6} />
            </div>
          )}

          <Button text={followText} onClick={handleFollowings} disabled={isUpdating} red={followText === "Unfollow"} />
        </div>
      )}
    </>
  );
}
