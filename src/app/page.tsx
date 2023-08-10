import { IracingIdInput } from "./(home)/iracing-id-input";
import { VisitedList } from "./(home)/visited-list";

export default function Home() {
  return (
    <main className="container grid items-center justify-center gap-6 pb-8 pt-6 md:gap-10 md:py-12">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Your iRacing Season Summary
        </h1>
        <p className="max-w-[700px] text-center text-lg text-muted-foreground sm:text-xl">
          See how you did this season!
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 justify-self-center md:w-[640px] md:flex-row">
        <IracingIdInput />
      </div>
      <VisitedList />
    </main>
  );
}
