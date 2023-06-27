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
  return { user, isLoading, error, setBookmarks };
}
