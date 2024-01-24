import AuthError from "@/app/_components/error/auth-error";
import { getServerAuthSession } from "@/server/auth";
import { type PropsWithChildren } from "react";
import { type GuildDashboardLayoutProps } from "./types";

export const metadata = {
  title: "Human Livestocks - Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function GuildDashboardLayout({
  children,
}: PropsWithChildren<GuildDashboardLayoutProps>) {
  const session = await getServerAuthSession();

  if (!session) {
    return <AuthError />;
  }

  return <div className="p-4">{children}</div>;
}
