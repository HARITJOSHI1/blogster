import { createTRPCRouter } from "~/server/api/trpc";
import { entryRouter } from "~/server/api/routers/entry";
import { blogRouter } from "./routers/blogs";

export const appRouter = createTRPCRouter({
  entry: entryRouter,
  blog: blogRouter
});

// export type definition of API to connect with the client
export type AppRouter = typeof appRouter;
