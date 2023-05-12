/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { z } from "zod";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

export const entryRouter = createTRPCRouter({
  test: publicProcedure.input(z.string()).query(({ input }) => {
    return `From tRPC server: ${input}`;
  }),

  siginUp: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma, res } = ctx;
      const { name, email, password } = input;
      const hashedPwd = await bcrypt.hash(password, 10);
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });

      const user = await prisma.appUser.create({
        data: {
          name,
          email,
          password: hashedPwd,
        },
        select: { id: true, name: true, email: true },
      });

      const token = sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES,
      });

      res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; SameSite=Strict`
      );

      return { status: 200, message: "success", data: { user } };
    }),
});
