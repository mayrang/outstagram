import { getBookmarkedPost, getLikedPosts, getUserPosts } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, { params: { slug } }: Context) {
  const [username, keyword] = slug;

  let router;

  switch (keyword) {
    case "posts":
      router = await getUserPosts(username);
      break;
    case "liked":
      router = await getLikedPosts(username);
      break;
    case "saved":
      router = await getBookmarkedPost(username);
      break;
  }
  return NextResponse.json(router);
}
