import { NextRequest, NextResponse } from "next/server";

import { addPost } from "@/service/post";
import { withSession } from "@/utils/withSession";

export async function POST(req: NextRequest) {
  return withSession(async (user) => {
    const formData = await req.formData();
    const text = formData.get("text")?.toString() || "";
    const file = formData.get("file") as Blob;

    return addPost(user.id, file, text).then((res) => NextResponse.json(res));
  });
}
