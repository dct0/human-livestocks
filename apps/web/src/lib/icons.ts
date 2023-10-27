import { SiDiscord } from "@icons-pack/react-simple-icons";
import { type IconType } from "@icons-pack/react-simple-icons/types";
import { type ClientSafeProvider } from "next-auth/react/types";

export const providerToIconMap: Partial<
  Record<ClientSafeProvider["id"], IconType>
> = {
  discord: SiDiscord,
};
