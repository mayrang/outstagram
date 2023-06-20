import { getFollowings } from "@/service/following";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { username } }: { params: { username: string } }) {
  const result = await getFollowings(username);
  return NextResponse.json(result.followings);
}
