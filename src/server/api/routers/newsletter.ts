import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const types = ["DAILY", "WEEKLY", "MONTHLY"]

export const newsletterRouter = createTRPCRouter({
    addSubscriber: publicProcedure
      .input(z.object({ 
        email: z.string().email(), 
        type: z.string().refine((value) => types.includes(value))}))
      .mutation(async ({ ctx, input }) => {
       const todayIsAGoodDay = new Date();
        let nextDay = todayIsAGoodDay;
       switch(input.type){
        case "DAILY":
          nextDay.setDate(todayIsAGoodDay.getDate())
          break;
        case "WEEKLY":
          nextDay.setDate(todayIsAGoodDay.getDate() + 7)
          break;
        case "MONTHLY":
          nextDay.setDate(todayIsAGoodDay.getMonth() + 1)
          break
       }
        return ctx.db.subscriber.create({
          data: {
            email: input.email,
            type: input.type as any,
            nextDay: nextDay,
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
  