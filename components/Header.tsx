import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <Head>
        <title>AIntelligent Code Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full  content-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 pb-7 lg:w-full">
        <header className="m-auto mt-5">
          <Link href="/" className="flex space-x-3">
            <Image
              alt="Intelligent Code generator"
              src="/gitIcon.png"
              className="h-8 w-8 sm:h-12 sm:w-12"
              width={32}
              height={32}
            />
            <h1 className="ml-2 text-2xl tracking-tight text-white max-md:pt-4 max-sm:pt-0 sm:text-4xl">
              AIntelligentcode.dev
            </h1>
          </Link>
        </header>
      </div>
    </>
  );
}
