import { NextResponse } from "next/server";

import { getSearchUsers } from "@/service/user";

export async function GET() {
  const searchUser = await getSearchUsers();
  return NextResponse.json(searchUser);
}
