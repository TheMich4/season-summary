export const dynamic = "force-dynamic";

import { Search } from "./_components/search";

export default function SearchPage() {
  return (
    <div className="container flex w-full flex-col items-center justify-center gap-2 py-4">
      <span className="text-center text-3xl font-bold leading-tight tracking-tight">
        Search for iRacing Profile
      </span>

      <Search />
    </div>
  );
}
