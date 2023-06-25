import { NextResponse } from "next/server";

import { getSearchUsers } from "@/service/user";

export async function GET(_: Request, { params: { keyword } }: { params: { keyword: string } }) {
  const searchUser = await getSearchUsers(keyword);
  return NextResponse.json(searchUser);
}
