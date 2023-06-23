"use client";
import React from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const modalElement = document.querySelector("#modal");
  return createPortal(children, modalElement as Element);
}
