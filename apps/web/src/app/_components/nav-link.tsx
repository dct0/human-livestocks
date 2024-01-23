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
        "text-tremor-default text-tremor-content hover:text-tremor-brand dark:text-dark-tremor-content dark:hover:text-dark-tremor-brand",
        { "text-tremor-brand dark:text-dark-tremor-brand": isActive },
        className,
      )}
    >
      {children}
    </Link>
  );
}
