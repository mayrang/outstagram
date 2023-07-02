import { NextRequest, NextResponse } from "next/server";

import { addComment } from "@/service/post";
import { withSession } from "@/utils/withSession";

export async function POST(req: NextRequest) {
  return withSession(async (user) => {
    const { id, comment } = await req.json();
    if (!id || comment === undefined) {
      return new Response("잘못된 요청입니다.", { status: 400 });
    }

    return addComment(id, user.id, comment)
      .then((res) => {
        return NextResponse.json(res);
      })
      .catch((error) => new Response(`${error} 발생`, { status: 500 }));
  });
}
