import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addFollow, removeFollow } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const { followUserId, follow } = await req.json();
  if (!followUserId || follow === undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const router = follow ? addFollow : removeFollow;
  return router(user.id, followUserId)
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((error) => new Response(`${error} 발생`, { status: 500 }));
}