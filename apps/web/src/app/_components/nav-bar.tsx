import { getServerAuthSession } from "@/server/auth";
import { Title } from "@tremor/react";
import Link from "next/link";
import NavLink from "./nav-link";
import GuildSelect from "./dashboard/guild-select";

// TODO: Convert part of this to a client component?
export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center border-b border-tremor-border bg-tremor-brand-muted px-4 md:px-8 dark:border-dark-tremor-border dark:bg-dark-tremor-brand-faint">
      <div className="flex-1">
        <Title className="text-xl font-black tracking-tighter md:text-3xl">
          <Link href="/" className="text-tremor-brand">
            Human Livestocks 🐄
          </Link>
        </Title>
      </div>
      <div>
        {" "}
        <ul className="flex items-center gap-4">
          <li>{!!session && <GuildSelect />}</li>
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
      </div>
    </nav>
  );
}
