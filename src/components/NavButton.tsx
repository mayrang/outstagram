"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
type Props = {
  fillIcon: React.ReactNode;
  outlineIcon: React.ReactNode;
  path: string;
};

export default function NavButton({ fillIcon, outlineIcon, path }: Props) {
  const pathname = usePathname();
  const isCurrentPage = pathname === path;
  return (
    <>
      {isCurrentPage ? (
        fillIcon
      ) : (
        <Link href={`${path}`} className="">
          {outlineIcon}
        </Link>
      )}
    </>
  );
}
