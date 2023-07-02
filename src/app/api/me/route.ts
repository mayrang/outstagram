import { getUser } from "@/service/user";
import { NextResponse } from "next/server";
import { withSession } from "@/utils/withSession";

export async function GET(_: Request) {
  return withSession(async (user) => {
    const result = await getUser(user.username);
    return NextResponse.json(result);
  });
}
