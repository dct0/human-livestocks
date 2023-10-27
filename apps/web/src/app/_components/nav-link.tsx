import { cn } from "@/lib";
import Link, { type LinkProps } from "next/link";
import { type AnchorHTMLAttributes } from "react";

export type NavLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    isActive?: boolean;
  };

export default function NavLink({
  className,
  children,
  isActive,
  ...props
}: NavLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "text-tremor-default text-tremor-content hover:text-tremor-brand",
        { "text-tremor-brand": isActive },
        className,
      )}
    >
      {children}
    </Link>
  );
}
