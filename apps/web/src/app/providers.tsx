"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { type headers as nextHeaders } from "next/headers";
import { Provider as JotaiProvider } from "jotai";

export default function Providers({
  headers,
  children,
}: {
  headers: ReturnType<typeof nextHeaders>;
  children: React.ReactNode;
}) {
  return (
    <JotaiProvider>
      <TRPCReactProvider headers={headers}>{children}</TRPCReactProvider>
    </JotaiProvider>
  );
}
