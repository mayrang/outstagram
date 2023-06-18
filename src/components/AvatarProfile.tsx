import React from "react";
import AvatarBadge from "./ui/AvatarBadge";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AvatarProfile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex items-center gap-4">
      <AvatarBadge image={user?.image || ""} username={user?.username} />
      <div>
        <h4 className="text-sm font-bold">{user?.username}</h4>
        <span className="text-lg leading-4 text-neutral-500">{user?.name}</span>
      </div>
    </div>
  );
}
