import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const blogRouter = createTRPCRouter({
  post: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { title, content } = input;
      const { prisma } = ctx;
      const blog = await prisma.article.create({
        data: {
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },

          title,
          content,
        },
      });

      return { status: 200, message: "success", data: { blog } };
    }),
});
