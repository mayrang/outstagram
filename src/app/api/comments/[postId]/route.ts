import { getComments } from "@/service/post";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { postId } }: { params: { postId: string } }) {
  const comments = await getComments(postId);
  return NextResponse.json(comments);
}
