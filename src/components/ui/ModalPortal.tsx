"use client";
import React from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  // browser 환경일때만 ssr방지
  if (typeof window === "undefined") {
    return null;
  }
  const modalElement = document.querySelector("#modal");
  return createPortal(children, modalElement as Element);
}
