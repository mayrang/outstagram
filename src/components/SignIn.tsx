"use client";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import React from "react";
import ColorButton from "./ui/ColorButton";
import { useSearchParams } from "next/navigation";

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | {};
};

export default function SignIn({ providers }: Props) {
  const query = useSearchParams().get("callbackUrl");
  console.log(query);
  console.log(providers);
  return (
    <ul className="gap-4">
      {Object.values(providers).map((provider) => (
        <li key={provider.id}>
          <ColorButton
            size="text-2xl"
            text={`Sign In With ${provider.name}`}
            onClick={() => signIn(provider.id, { callbackUrl: query || "http://localhost:3000" })}
          />
        </li>
      ))}
    </ul>
  );
}
