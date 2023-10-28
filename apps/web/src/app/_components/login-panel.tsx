"use client";
import { cn } from "@/lib";
import { providerToColorMap, providerToIconMap } from "@/lib/icons";
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
          <Button
            className={cn(providerToColorMap[provider.id])}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            icon={providerToIconMap[provider.id]}
          >
            {provider.name}
          </Button>
        </div>
      ))}
    </>
  );
}
