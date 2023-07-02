import { getPost } from "@/service/post";
import { NextResponse } from "next/server";

import { withSession } from "@/utils/withSession";

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  return withSession(async (user) => {
    const comments = await getPost(id);
    return NextResponse.json(comments);
  });
}
