import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider, {
  type DiscordProfile,
} from "next-auth/providers/discord";

import { env } from "@/env.mjs";
import { type PrismaClientSingleton, db } from "@/server/db";
import { type PrismaClient } from "db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Profile extends DiscordProfile {}

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// https://github.com/nextauthjs/next-auth/issues/6078#issuecomment-1435940753
const CustomPrismaAdapter = (prisma: PrismaClientSingleton) => {
  return PrismaAdapter(prisma as unknown as PrismaClient);
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ profile }) => {
      if (!profile) return false;
      const id = profile.id;

      await db.user.upsert({
        create: {
          id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
        },
        update: {
          name: profile.name,
          email: profile.email,
          image: profile.image,
        },
        where: {
          id,
        },
      });

      return true;
    },
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  adapter: CustomPrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      userinfo: "https://discord.com/api/users/@me",
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
      allowDangerousEmailAccountLinking: true, // we'll only use discord so this is fine
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
