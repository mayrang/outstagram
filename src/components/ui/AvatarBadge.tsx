import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  username: string;
};

export default function AvatarBadge({ image, username }: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="bg-gradient-to-bl  from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem] rounded-full overflow-hidden "
    >
      <Image src={image} alt={username} width={50} height={50} className="rounded-full" />
    </Link>
  );
}
