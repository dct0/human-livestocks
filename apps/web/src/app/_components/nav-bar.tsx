import { getServerAuthSession } from "@/server/auth";
import { Title } from "@tremor/react";
import Link from "next/link";
import NavLink from "./nav-link";
import GuildSelect from "./dashboard/guild-select";

// TODO: Convert part of this to a client component?
export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed z-20 flex h-20 w-full items-center justify-between border-b px-6">
      <Title>
        <Link href="/">
          Human Livestocks<span>🐄</span>
        </Link>
      </Title>
      <ul className="flex items-center gap-4">
        <li>
          { !!session && <GuildSelect />}
        </li>
        {!!session ? (
          <li>
            <NavLink href="/auth/logout">Logout</NavLink>
          </li>
        ) : (
          <li>
            <NavLink href="/auth/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
