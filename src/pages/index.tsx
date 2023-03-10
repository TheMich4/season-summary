import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "~/components/Loader";

const Home: NextPage = () => {
  const router = useRouter();

  const [iracingId, setIracingId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!iracingId) return;

    setLoading(true);
    await router.push(`/driver/${iracingId}`);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Season summary</title>
        <meta name="description" content="Get you iracing season summary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800 text-slate-100">
        {/* <DriverList /> */}
        <div className="flex flex-row gap-1">
          {loading ? (
            <Loader />
          ) : (
            <>
              <input
                disabled={loading}
                value={iracingId}
                onChange={(e) => setIracingId(e.target.value)}
                type="text"
                placeholder="Search for your iracing id"
                className="rounded-md bg-slate-900 p-2 text-slate-300 placeholder:text-slate-500"
              />
              <button
                disabled={loading}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await handleSearch()}
                className="rounded-md bg-slate-900 p-2 text-slate-300"
              >
                Search
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
