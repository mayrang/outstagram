import React from "react";
import AvatarProfile from "./AvatarProfile";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <AvatarProfile />
      <div className="text-neutral-500">
        <p className="text-sm ">About · Help · API · Jobs · Privacy · Terms · Location · Language</p>
        <p className="text-sm font-semibold mt-3">@Copyright OUTSTAGRAM from METAL</p>
      </div>
    </div>
  );
}
