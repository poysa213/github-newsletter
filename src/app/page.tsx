import Link from "next/link";
import { api } from "~/trpc/server";
import  Subscribe from "~/app/_components/subscribe"
import { scheduleCronJob } from "./utils/cronJob";

export default async function Home() {
  return (
    <main className="p-4 flex min-h-screen flex-col text-white items-center justify-center bg-violet-500">
      <h1 className="font-bold md:text-7xl text-4xl">Github News-Letter</h1>
      <p className="md:font-medium md:text-xl mx-auto text-sm font-thin">See what the GitHub community is most excited about everyday!(repositories)</p>
      <p className="md:font-medium md:text-xl mx-auto text-sm font-thin">Know who are the developers building the hot tools today.(accounts)</p>
      <br />
      <br />
      <Subscribe />
      

    </main>
  );
}



