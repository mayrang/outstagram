import React from "react";
import AvatarProfile from "./AvatarProfile";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-8">
      <AvatarProfile />
      <p className=" text-gray-600">
        About · Help · API · Jobs ·<br />
        Privacy · Terms · Location ·<br />
        Language
      </p>
      <p className="font-semibold text-gray-600">
        @Copyright OUTSTAGRAM
        <br />
        from METAL
      </p>
    </div>
  );
}
