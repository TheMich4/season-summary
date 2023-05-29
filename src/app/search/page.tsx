import { Search } from "@/displays/search"

export default function SearchPage() {
  return (
    <div className="container grid items-center justify-center gap-2 py-4">
      <span className="text-3xl font-bold leading-tight tracking-tight">
        Search for iRacing Profile
      </span>

      <Search />
    </div>
  )
}
