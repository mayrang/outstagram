"use client";
import React from "react";
import { SWRConfig } from "swr";

export default function SWRContext({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher: (resource: string) => fetch(resource).then((res) => res.json()) }}>
      {children}
    </SWRConfig>
  );
}
