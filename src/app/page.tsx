import Subscribe from "~/app/_components/subscribe";

export default async function Home() {
  return (
    <div className="flex flex-col h-svh">
      <main className="flex-1 md:p-8 flex flex-col text-white items-center justify-center bg-violet-500">
        <div className="md:mb-12 mb-6">
        <h1 className="font-bold md:text-7xl text-4xl">Github News-Letter</h1>
        <a href="https://github.com/trending">https://github.com/trending</a>
        <p className="md:font-medium md:text-xl mx-auto text-sm font-thin">See what the GitHub community is most excited about every day! (repositories)</p>
        <p className="md:font-medium md:text-xl mx-auto text-sm font-thin">Know who are the developers building the hot tools today. (accounts)</p>
        </div>
        <Subscribe />
      </main>
      <div className="p-4 text-center bg-violet-500 text-white">
        <p>by poysa213</p>
        <a href="https://github.com/poysa213/" className="font-bold text-xl">My Github</a>
      </div>
    </div>
  );
}
