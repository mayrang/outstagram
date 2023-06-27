import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmarks, removeBookmarks } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const { id, bookmark } = await req.json();
  if (!id || bookmark === undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const router = bookmark ? addBookmarks : removeBookmarks;
  return router(user.id, id)
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((error) => new Response(`${error} 발생`, { status: 500 }));
}
