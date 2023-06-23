import React from "react";

import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex flex-col md:flex-row mx-auto w-full max-w-[850px] p-4 ">
      <div className="basis-3/4 md:px-6  min-w-0">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4 ml-4">
        <SideBar />
      </div>
    </section>
  );
}
