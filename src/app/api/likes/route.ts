import { addLikes, removeLikes } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";
import { withSession } from "@/utils/withSession";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
    const { id, like } = await req.json();
    if (!id || like === undefined) {
      return new Response("잘못된 요청입니다.", { status: 400 });
    }

    const router = like ? addLikes : removeLikes;
    return router(id, user.id)
      .then((res) => {
        return NextResponse.json(res);
      })
      .catch((error) => new Response(`${error} 발생`, { status: 500 }));
  });
}
