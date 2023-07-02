import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

type Props = {
  params: { username: string };
};

const getUser = cache(async (username: string) => await getUserForProfile(username));

export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username})`,
    description: `${user?.name}'s profile`,
  };
}

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);
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
