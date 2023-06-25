import { DetailUser } from "@/model/user";
import React from "react";
import UserProfile from "./UserProfile";

type Props = {
  userList: DetailUser[];
};

export default function UserProfileList({ userList }: Props) {
  return (
    <ul className="w-full p-6 flex flex-col items-center gap-2">
      {userList.map((user) => (
        <li className="w-full" key={user.id}>
          <UserProfile user={user} />
        </li>
      ))}
    </ul>
  );
}
