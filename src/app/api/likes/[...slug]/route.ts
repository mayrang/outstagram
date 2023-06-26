import { addLikes, getBookmarkedPost, getLikedPosts, getUserPosts, removeLikes } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, { params: { slug } }: Context) {
  if (!slug || slug.length < 3) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const [userId, postId, type] = slug;

  let router;
  if (type === "add") {
    router = addLikes;
  } else if (type === "remove") {
    router = removeLikes;
  } else {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  return router(postId, userId)
    .then((res) => {
      console.log("res", res);
      return new Response("성공", { status: 200 });
    })
    .catch((error) => new Response(`${error} 발생`, { status: 500 }));
}
