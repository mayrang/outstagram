import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  console.log(username);
  const user = await getUserForProfile(username);
  if (!user) {
    notFound();
  }
  return (
    <section className="w-full max-w-7xl">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
