import { NextRequest, NextResponse } from "next/server";

import { addBookmarks, removeBookmarks } from "@/service/user";
import { withSession } from "@/utils/withSession";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
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
  });
}
