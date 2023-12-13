import { IracingIdInput } from "./(home)/iracing-id-input";
import { Title } from "./_components/title";
import { VisitedList } from "./(home)/visited-list";
import { YourProfile } from "./(home)/your-profile";
import { env } from "@/env.mjs";

export default function Home() {
  return (
    <main className="container grid min-h-full items-center justify-center gap-6 pb-8 pt-6 md:gap-10 md:py-12">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <Title />
        <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
          See how you did this season!
        </p>
      </div>

      <IracingIdInput />
      <YourProfile />
      <VisitedList apiUrl={env.API_URL} />
    </main>
  );
}
