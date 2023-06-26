import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/SignIn";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "sign in",
  description: "sign in or sign up",
};

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function SignInPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) || {};

  return (
    <div className="flex mt-24 justify-center">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </div>
  );
}
