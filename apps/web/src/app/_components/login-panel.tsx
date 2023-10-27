"use client";
import { Button } from "@tremor/react";
import { type BuiltInProviderType } from "next-auth/providers";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";

export default function LoginPanel({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </>
  );
}
