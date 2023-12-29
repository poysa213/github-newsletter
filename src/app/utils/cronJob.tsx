import puppeteer from "puppeteer";
import { api } from "~/trpc/react";
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import ejs from "ejs";
import { reposEmailTemplate } from "./emailTemplate";
import { sendMail } from "../services/mailServices";
const prisma = new PrismaClient();



interface Repository {
  name: string;
  link: string;
  description: string;
}

export const scheduleCronJob = () => {
  cronJob()
    cron.schedule('0 0 * * *', async () => {
        console.log('Running cronJob...');
        await cronJob();
      });
}

const cronJob = async() => {
   const repos = await scrape();
   await prisma.repository.createMany({
    data: repos
   })
   const html = await ejs.render(reposEmailTemplate, {repos})
   const users = await prisma.subscriber.findMany()
   for(const user of users){
    await sendMail("newsletter", user.email, html)
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
        const link = `https://github.com${linkElement.getAttribute('href')}` || '';
        const description = descriptionElement?.innerText || '';

        repos.push({ name, link, description });
      }
    });
    console.log(repos)
    return repos;
  });

  await browser.close();
  return repositories as Repository[];
};


