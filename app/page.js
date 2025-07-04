'use client'
import Image from "next/image";
import WavyText from './components/WavyText.js';
import App from './components/App.js';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-linear-to-b from-cyan-600 to-blue-700 overscroll-auto">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-sans)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.js
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes in about like a minute after you push.
          </li>
        </ol>
        {/* repo page */}
        <div className="flex gap-1 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#b38787] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
        <App />
        <p>one two <WavyText text={"wavy"} /> three</p>
        <div className="w-20">
          testets k kf kdf okfdskofds kofskdo kofdkso ksoko fdkof ksodkfsokfso kowefkosd kosdkfok ffffffffffffffffffffffffffffffff sdfk
           sofksok oskfo k testets k kf kdf okfdskofds kofskdo kofdkso ksoko fdkof ksodkfsokfso kowefkosd kosdkfok ffffffffffffffffffffffffffffffff sdfk
           sofksok oskfo k testets k kf kdf okfdskofds kofskdo kofdkso ksoko fdkof ksodkfsokfso kowefkosd kosdkfok ffffffffffffffffffffffffffffffff sdfk
           sofksok oskfo k testets k kf kdf okfdskofds kofskdo kofdkso ksoko fdkof ksodkfsokfso kowefkosd kosdkfok ffffffffffffffffffffffffffffffff sdfk
           sofksok oskfo k testets k kf kdf okfdskofds kofskdo kofdkso ksoko fdkof ksodkfsokfso kowefkosd kosdkfok ffffffffffffffffffffffffffffffff sdfk
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
