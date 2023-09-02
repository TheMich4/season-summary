import { IracingIdInput } from "./(home)/iracing-id-input";
import { VisitedList } from "./(home)/visited-list";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="container grid items-center justify-center gap-6 pb-8 pt-6 md:gap-10 md:py-12 min-h-full">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Your iRacing Season Summary
        </h1>
        <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
          See how you did this season!
        </p>
      </div>

      <IracingIdInput />
      <VisitedList />

      <div className="text-sm items-center flex flex-col border rounded-md p-2 text-center text-balance">
        <p className="font-bold mb-1">This page is still in development.</p>
        <p>
          If you have any feedback or ideas, please let me know on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold"
          >
            Github
          </a>
          .
        </p>
        <p>
          Or contact me on{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold"
          >
            Twitter
          </a>
          .
        </p>
      </div>
    </main>
  );
}
