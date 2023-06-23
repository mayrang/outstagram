import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },

  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};

export default function ScrollableBar({ children }: { children: React.ReactNode }) {
  return (
    <Carousel
      customRightArrow={<AiOutlineRight className="z-10 w-8 cursor-pointer h-8 right-[calc(4%+1px)] absolute" />}
      customLeftArrow={<AiOutlineLeft className="z-10 w-8 cursor-pointer h-8 left-[calc(4%+1px)] absolute" />}
      infinite
      containerClass="w-full flex  gap-2 z-1"
      arrows
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
