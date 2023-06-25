import { getPost } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getSearchUser } from "@/service/user";

export async function GET(req: Request, { params: { data } }: { params: { data: string } }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("유저가 존재하지 않습니다.", { status: 401 });
  }
  const searchUser = await getSearchUser(data);
  return NextResponse.json(searchUser);
}
