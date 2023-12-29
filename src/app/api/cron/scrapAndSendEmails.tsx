import puppeteer from "puppeteer";
import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface Repository {
  name: string;
  link: string;
  description: string;
}

export async function GET (){
  cronJob()
  return NextResponse.json({"msg": "success"})
}

const cronJob = async() => {
   const repos = await scrape();
   await prisma.repository.createMany({
    data: repos
   })
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


