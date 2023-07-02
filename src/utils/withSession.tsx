import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthUser } from "@/model/user";
import { getServerSession } from "next-auth";

export async function withSession(handler: (user: AuthUser) => Promise<Response>): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  return handler(user);
}
