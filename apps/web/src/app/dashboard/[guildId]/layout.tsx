import AuthError from "@/app/_components/error/auth-error";
import { getServerAuthSession } from "@/server/auth";
import { PropsWithChildren, useEffect } from "react";
import { GuildDashboardLayoutProps } from "./types";
import ClientShit from "./client-shit";

export const metadata = {
  title: "Human Livestocks - Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function GuildDashboardLayout({
  params,
  children,
}: PropsWithChildren<GuildDashboardLayoutProps>) {
  const session = await getServerAuthSession();
  const guildId = params.guildId;

  if (!session) {
    return <AuthError />;
  }

  return (
    <div className="p-4">
      <ClientShit guildId={guildId} />
      {children}
    </div>
  );
}
