import puppeteer from "puppeteer";
import { NextResponse } from 'next/server'
import ejs from "ejs";
import { PrismaClient } from '@prisma/client';
import { sendMail } from "~/app/services/mailServices";
import { reposEmailTemplate } from "~/app/utils/emailTemplate";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface Repository {
  name: string;
  link: string;
  description: string;
}

export async function GET (){
  await cronJob()
  return NextResponse.json({status: 200})
}

const cronJob = async() => {
   const repos = await scrape();
   await prisma.repository.createMany({
    data: repos
   });
   const html = await ejs.render(reposEmailTemplate, {repos})
   const todayIsAGoodDay = new Date();

   let users = await prisma.subscriber.findMany()
   users = users.filter((user)=> user.nextDay.getDate() === todayIsAGoodDay.getDate())
   console.log(users)
   for(const user of users){
    await sendMail("Github-newsletter", user.email, html)
    let nextDay = new Date();
       switch(user.type){
        case "DAILY":
          nextDay.setDate(todayIsAGoodDay.getDate() + 1)
          break;
        case "WEEKLY":
          nextDay.setDate(todayIsAGoodDay.getDate() + 7)
          break;
        case "MONTHLY":
          nextDay.setDate(todayIsAGoodDay.getMonth() + 1)
          break
       }
       await prisma.subscriber.update({
        where:{
          id: user.id
        },
        data:{
          nextDay: nextDay
        }
       })
   }
}

const scrape = async (): Promise<Repository[]> => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://github.com/trending", {
    waitUntil: "domcontentloaded",
  });

  const repositories = await page.evaluate<Repository[]>(() => {
    const repoElements = document.querySelectorAll('.Box-row');

    const repos: Repository[] = [];
    repoElements.forEach((repoElement) => {
      const linkElement = repoElement.querySelector('.Link') as HTMLElement | null;
      const descriptionElement = repoElement.querySelector('.col-9') as HTMLElement | null;

      if (linkElement) {
        const name = linkElement?.innerText.trim() || '';
        const link = `https://github.com${linkElement.getAttribute('href')}` ?? '';
        const description = descriptionElement?.innerText || '';

        repos.push({ name, link, description });
      }
    });
    return repos;
  });

  await browser.close();
  return repositories as Repository[];
};


