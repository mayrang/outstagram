import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getPosts } from "@/service/post";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("유저가 존재하지 않습니다.", { status: 401 });
  }
  const posts = await getPosts(user.username);
  return NextResponse.json(posts);
}
