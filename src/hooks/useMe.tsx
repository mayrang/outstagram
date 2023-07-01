import { HomeUser } from "@/model/user";
import React from "react";
import useSWR from "swr";

async function updateBookmarks(id: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({
      id,
      bookmark,
    }),
  }).then((res) => {
    return res.json();
  });
}

async function updateFollowings(followUserId: string, follow: boolean) {
  return fetch("/api/followings", {
    method: "PUT",
    body: JSON.stringify({
      followUserId,
      follow,
    }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>(`/api/me`);

  const setBookmarks = (user: HomeUser, postId: string, bookmark: boolean) => {
    const newUser = {
      ...user,
      bookmarks: bookmark ? [...user.bookmarks, postId] : user.bookmarks.filter((item) => item !== postId),
    };
    if (user) {
      return mutate(updateBookmarks(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    }
  };

  const setFollowings = (followUserId: string, follow: boolean) => {
    return mutate(updateFollowings(followUserId, follow), {
      populateCache: false,
    });
  };
  return { user, isLoading, error, setBookmarks, setFollowings };
}
