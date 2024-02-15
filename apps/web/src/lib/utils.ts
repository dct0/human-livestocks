import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function formatAsGraphDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
}

export const zodEnum = <T,>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];
