"use client";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import NavButton from "./NavButton";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import ColorButton from "./ui/ColorButton";
import { signIn, signOut, useSession } from "next-auth/react";
import AvatarBadge from "./ui/AvatarBadge";
import Link from "next/link";

const menu = [
  {
    fillIcon: <AiFillHome />,
    outlineIcon: <AiOutlineHome />,
    path: "/",
  },
  {
    fillIcon: <RiSearchFill />,
    outlineIcon: <RiSearchLine />,
    path: "/search",
  },
  {
    fillIcon: <BsPlusSquareFill />,
    outlineIcon: <BsPlusSquare />,
    path: "/new",
  },
];

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="w-full bg-white border-b mx-auto p-4 flex items-center justify-between">
      <Link href="/">
        <h1 className="font-bold text-3xl">Outstagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          {menu.map(({ path, fillIcon, outlineIcon }) => (
            <li key={path}>
              <NavButton path={path} fillIcon={fillIcon} outlineIcon={outlineIcon} />
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <AvatarBadge image={user.image} username={user.username} highlight size="small" />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign Out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign In" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
