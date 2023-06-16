"use client";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import NavButton from "./NavButton";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import ColorButton from "./ui/ColorButton";
import { signIn, signOut, useSession } from "next-auth/react";

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
  return (
    <div className="w-full bg-white border-b mx-auto sticky p-4 flex items-center justify-between">
      <h1 className="font-bold text-3xl">Outstagram</h1>
      <nav>
        <ul className="flex items-center  gap-4">
          {menu.map(({ path, fillIcon, outlineIcon }, index) => (
            <NavButton key={index} path={path} fillIcon={fillIcon} outlineIcon={outlineIcon} />
          ))}
          {session ? (
            <ColorButton text="Sign Out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="Sign In" onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  );
}
