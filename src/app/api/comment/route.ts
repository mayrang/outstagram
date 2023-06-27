import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmarks, removeBookmarks } from "@/service/user";
import { addComment } from "@/service/post";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const { id, comment } = await req.json();
  if (!id || comment === undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((error) => new Response(`${error} 발생`, { status: 500 }));
}
