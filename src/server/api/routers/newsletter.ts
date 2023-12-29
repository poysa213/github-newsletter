import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const types = ["DAILY", "WEEKLY", "MONTHLY"]

export const newsletterRouter = createTRPCRouter({
    addSubscriber: publicProcedure
      .input(z.object({ 
        email: z.string().email(), 
        type: z.string().refine((value) => types.includes(value))}))
      .mutation(async ({ ctx, input }) => {
       
        return ctx.db.subscriber.create({
          data: {
            email: input.email,
            type: input.type as any,
          },
        });
      }),
      addRepository: publicProcedure
      .input(z.array(z.object({
        name: z.string(),
        link: z.string().url(),
        description: z.string(),
      })))
      .mutation(async ({ ctx, input }) => {
        return ctx.db.repository.createMany({
          data: input
        })
      })

  });
  