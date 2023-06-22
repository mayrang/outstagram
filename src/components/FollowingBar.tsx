"use client";
import { User } from "@/model/user";
import React from "react";
import useSWR from "swr";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AvatarBadge from "./ui/AvatarBadge";
import { PropagateLoader } from "react-spinners";

type Props = {
  user: User;
};

export default function FollowingBar({ user }: Props) {
  console.log(user);
  const { data: followings, isLoading } = useSWR(`/api/following/${user.username}`);
  console.log(followings);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };
  return (
    <section className="flex items-center justify-center w-full  border shadow-md py-4">
      {isLoading ? (
        <PropagateLoader className="mx-auto py-12" color="#FF0000" />
      ) : (
        <Carousel infinite containerClass="w-full flex  gap-2 " arrows responsive={responsive}>
          {followings.map(({ image, name, username }: User) => (
            <div className=" flex flex-col items-center" key={username}>
              <AvatarBadge highlight image={image} username={username} size="normal" />
              <span className="text-base">{name}</span>
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
}
