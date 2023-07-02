import { getPosts } from "@/service/post";
import { NextResponse } from "next/server";
import { withSession } from "@/utils/withSession";

export async function GET() {
  return withSession(async (user) => {
    const posts = await getPosts(user.username);
    return NextResponse.json(posts);
  });
}
