import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addFollow, removeFollow } from "@/service/user";
import { addPost } from "@/service/post";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const formData = await req.formData();
  const text = formData.get("text")?.toString() || "";
  const file = formData.get("file") as Blob;

  return addPost(user.id, file, text).then((res) => NextResponse.json(res));
}
