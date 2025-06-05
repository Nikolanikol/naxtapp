"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// const testBrowser = async () => {
//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto("https://encar.com");
//   const userAgent = await page.evaluate(() => navigator.userAgent);
//   console.log("User Agent:", userAgent);

//   await browser.close();
//   return userAgent;
// };
export default function Home() {
  //   const userAgent = testBrowser();
  // .then((result) => console.log(result))
  // .catch((error) => console.error("Error:", error));
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(
      `https://api.encar.com/mobile/usability/target?pcId=17489478488607039847931
`,
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibWVkaWFfYXBpIiwibW9iaWxlX2FwaSIsImRpYWdub3Npc19hcGkiLCJlbmNhcl9yZXNvdXJjZSJdLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MjU1MzU4OTIyMCwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJqdGkiOiJlMDk0ZjkyNS01MTc5LTQzNjctYWVkYi03NmM4ZGVmMTBjMTgiLCJjbGllbnRfaWQiOiJiYzI4NWEwMy03OTE5LTRjZTktYWEyOC1mMWU0ZmZhYzM2MzIifQ._bXyZvx3Ie7wJxbOBXXyu5rpuE5ZwUNg_rnhfpTNvKw`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("Target Data:", data));
    fetch("/api/user-agent")
      .then((res) => res.json())
      .then((data) => setUserAgent(data.userAgent))
      .then(() =>
        fetch(
          `https://api.encar.com/search/car/list/mobile?count=true&q=(And.Hidden.N._.CarType.A.)&sr=%7CMobileModifiedDate%7C0%7C200&inav=%7CMetadata%7CSort&cursor=
`,
          {
            headers: {
              "Content-Type": "application/json",
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/136.0.7103.25 Safari/537.36",
            },
          }
        )
      )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to fetch UA:", err))
      .finally(() => setLoading(false));
  }, []);
  if (data) {
    console.log("Fetched Data:", data);
  }
  if (loading) return <div className="">Loading...</div>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>{userAgent}</p>
        <div>
          {data &&
            data.SearchResults.map((item: any) => (
              <div key={item.Id} className="text-sm sm:text-base">
                {" "}
                {item.Id} {item.Model}{" "}
              </div>
            ))}
        </div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
