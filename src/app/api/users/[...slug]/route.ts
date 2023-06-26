import { getBookmarkedPost, getLikedPosts, getUserPosts } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, { params: { slug } }: Context) {
  if (!slug || slug.length < 2) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  const [username, keyword] = slug;

  let router = getUserPosts;

  switch (keyword) {
    case "posts":
      router = getUserPosts;
      break;
    case "liked":
      router = getLikedPosts;
      break;
    case "saved":
      router = getBookmarkedPost;
      break;
  }
  return router(username).then((posts) => NextResponse.json(posts));
}
