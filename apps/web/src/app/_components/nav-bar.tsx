import { getServerAuthSession } from "@/server/auth";
import { Title } from "@tremor/react";
import Link from "next/link";
import NavLink from "./nav-link";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed z-20 flex h-20 w-full items-center justify-between border-b px-6">
      <Title>
        <Link href="/">
          Human Livestocks<span>🐄</span>
        </Link>
      </Title>
      <ul className="flex gap-4">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          {!session ? (
            <NavLink href="/auth/login">Login</NavLink>
          ) : (
            <NavLink href="/auth/logout">Logout</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
