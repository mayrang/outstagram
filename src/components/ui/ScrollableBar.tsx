import React from "react";
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
    <Carousel infinite containerClass="w-full flex  gap-2 " arrows responsive={responsive}>
      {children}
    </Carousel>
  );
}
