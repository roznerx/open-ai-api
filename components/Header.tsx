import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 text-center via-purple-500 to-pink-500 content-center flex w-full lg:w-full pb-7 px-2">
      <header className="m-auto mt-5">
        <Link href="/" className="flex space-x-3">
          <Image
            alt="Intelligent Code generator"
            src="/gitIcon.png"
            className="sm:w-12 sm:h-12 w-8 h-8"
            width={32}
            height={32}
          />
          <h1 className="sm:text-4xl text-2xl text-white ml-2 tracking-tight">
          AIntelligentCode.com
          </h1>
        </Link>
      </header>
      
      </div>
  );
}
