import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendMail } from "~/app/services/mailServices";
import { successSubscriptionEmail } from "~/app/utils/emailTemplate";
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
       const subscribed = await ctx.db.subscriber.findFirst({ 
        where:{
          email: input.email
        } 
       })
       if(subscribed){
        return "ALready subscribed!"
       }
        const success =  await ctx.db.subscriber.create({
          data: {
            email: input.email,
            type: input.type as any,
            nextDay: nextDay,
          },
        });
        if(success){
          await sendMail("Welcome to the GitHub Newsletter Community!", input.email, successSubscriptionEmail)
        }
        return success;
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
  