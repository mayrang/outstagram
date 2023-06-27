import { addLikes, getBookmarkedPost, getLikedPosts, getUserPosts, removeLikes } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

type Context = {
  params: {
    slug: string[];
  };
};
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
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
}
