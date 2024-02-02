import { TRPCReactProvider } from "@/trpc/react";
import { cookies, type headers as nextHeaders } from "next/headers";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
  );
}
