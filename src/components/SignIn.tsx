"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <ul className="gap-4">
      {Object.values(providers).map((provider) => (
        <li key={provider.id}>
          <ColorButton
            size="big"
            text={`Sign In With ${provider.name}`}
            onClick={() => signIn(provider.id, { callbackUrl })}
          />
        </li>
      ))}
    </ul>
  );
}
