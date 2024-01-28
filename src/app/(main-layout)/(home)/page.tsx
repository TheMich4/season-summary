import { Title } from "./_components/title";
import { env } from "@/env";
import { Search } from "./_components/search";
import { YourProfile } from "./_components/your-profile";
import { VisitedList } from "./_components/visited-list";

export default function Home() {
  return (
    <main className="container flex min-h-full flex-col items-center justify-center gap-6 pb-8 pt-6 md:gap-10 md:py-12">
      <div className="flex min-w-full flex-col items-center gap-2">
        <Title />
        <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
          See how you did this season!
        </p>
      </div>

      <Search />

      <YourProfile />

      <VisitedList apiUrl={env.API_URL} />
    </main>
  );
}
