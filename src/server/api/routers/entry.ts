/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const entryRouter = createTRPCRouter({
  siginUp: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma} = ctx;
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

      return { status: 200, message: "success", data: { user } };
    }),
});
