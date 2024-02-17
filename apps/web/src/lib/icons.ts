import { SiDiscord } from "@icons-pack/react-simple-icons";
import { type IconType } from "@icons-pack/react-simple-icons/types";
import { type ClassValue } from "clsx";
import { type ClientSafeProvider } from "next-auth/react/types";

export const providerToIconMap: Partial<
  Record<ClientSafeProvider["id"], IconType>
> = {
  discord: SiDiscord,
};

export const providerToColorMap: Partial<
  Record<ClientSafeProvider["id"], ClassValue>
> = {
  discord:
    "!bg-icon-discord hover:!bg-icon-discord-hover !text-gray-50 !border-none",
};
