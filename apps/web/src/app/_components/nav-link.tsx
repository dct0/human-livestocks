"use client";

import { cn } from "@/lib";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { type AnchorHTMLAttributes } from "react";

export type NavLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  className,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return (
    <Link
      {...props}
      className={cn(
        "rounded-full border bg-tremor-background px-4 py-2 text-tremor-default text-tremor-content transition hover:bg-tremor-background-subtle dark:bg-dark-tremor-background dark:text-dark-tremor-content-emphasis dark:hover:bg-dark-tremor-background-subtle",
        {
          "border-tremor-brand bg-dark-tremor-brand-faint dark:border-dark-tremor-brand":
            isActive,
        },
        className,
      )}
    >
      {children}
    </Link>
  );
}
