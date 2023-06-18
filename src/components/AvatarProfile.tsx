import React from "react";
import AvatarBadge from "./ui/AvatarBadge";
import { useSession } from "next-auth/react";

export default function AvatarProfile() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="flex items-center gap-4">
      <AvatarBadge image={user?.image || ""} username={user?.username} size="big" />
      <div>
        <h4 className="text-lg font-bold">{user?.username}</h4>
        <span className="text-lg">{user?.name}</span>
      </div>
    </div>
  );
}
