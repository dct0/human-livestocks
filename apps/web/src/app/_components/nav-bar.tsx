import { getServerAuthSession } from "@/server/auth";
import { Title } from "@tremor/react";
import Link from "next/link";
import NavLink from "./nav-link";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed z-20 flex h-20 w-full items-center justify-between border-b px-6">
      <Title>
        <Link href="/">Human Livestocks🐄</Link>
      </Title>
      <div className="flex gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        {!session ? (
          <NavLink href="/auth/login">Login</NavLink>
        ) : (
          <NavLink href="/auth/logout">Logout</NavLink>
        )}
      </div>
    </nav>
  );
}
