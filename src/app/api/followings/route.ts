import { NextRequest, NextResponse } from "next/server";

import { addFollow, removeFollow } from "@/service/user";
import { withSession } from "@/utils/withSession";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
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
  });
}
