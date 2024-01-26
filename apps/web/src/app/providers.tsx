"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { type headers as nextHeaders } from "next/headers";

export default function Providers({
  headers,
  children,
}: {
  headers: ReturnType<typeof nextHeaders>;
  children: React.ReactNode;
}) {
  return <TRPCReactProvider headers={headers}>{children}</TRPCReactProvider>;
}
