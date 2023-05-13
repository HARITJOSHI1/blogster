/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import { compare } from "bcrypt";
import { env } from "~/env.mjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      // eslint-disable-next-line @typescript-eslint/require-await
      async authorize(credentials) {
        const cred = credentials as {
          existingUser?: boolean;
          id: string;
          name?: string;
          email: string;
          password: string;
        };
        
        if (cred.existingUser) {
          const { email, id, name } = cred;
          const user = { id, email, name } as User;
          return user;
        }

        const user = await prisma.appUser.findUnique({
          where: { email: cred.email },
        });

        if (user) {
          const isPwdMatch = await compare(cred.password, user.password);
          if (isPwdMatch) return user;
          return null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        console.log(user);

        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    session: ({ token, session }) => {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: env.JWT_SECRET_A,
  jwt: {
    secret: env.JWT_SECRET_A,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
