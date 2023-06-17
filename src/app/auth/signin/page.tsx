import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/SignIn";
import ColorButton from "@/components/ui/ColorButton";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) || {};

  return (
    <div className="flex mt-[30%] justify-center">
      <SignIn providers={providers} />
    </div>
  );
}
