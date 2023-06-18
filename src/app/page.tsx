"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import FollowingBar from "@/components/followingBar";
import PostList from "@/components/PostList";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user]);
  return (
    <section className="flex w-full mt-6">
      <div className="w-1/2">
        <FollowingBar />
        <PostList />
      </div>
      <div className="w-1/2">
        <SideBar />
      </div>
    </section>
  );
}
