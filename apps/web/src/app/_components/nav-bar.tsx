"use client";

import { Title } from "@tremor/react";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/api/auth/signin", label: "Login" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-20 items-center justify-between border-b px-6">
      <Title>
        <Link href="/">Human Livestocks🐄</Link>
      </Title>
      <div className="flex gap-4">
        {routes.map(({ href, label }) => (
          <NavLink key={href} href={href} isActive={pathname === href}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
