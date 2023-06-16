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
    <div className="text-2xl group">
      {isCurrentPage ? (
        fillIcon
      ) : (
        <Link href={`${path}`}>
          <div className="block group-hover:hidden">{outlineIcon}</div>

          <div className="hidden group-hover:block">{fillIcon}</div>
        </Link>
      )}
    </div>
  );
}
