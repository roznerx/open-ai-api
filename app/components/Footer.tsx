export default function Footer() {
  return (
    <footer className="mt-5 mb-3 flex h-16 w-full flex-col items-center space-y-3 border-t px-3 pt-4 sm:mb-0 sm:h-20 sm:flex-row sm:pt-2">
      <div className="m-auto content-center">
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline-offset-2 transition hover:underline"
        >
          OpenAI{" "}
        </a>
        and{" "}
        <a
          href="https://vercel.com/features/edge-functions"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline-offset-2 transition hover:underline"
        >
          Vercel Edge Functions.
        </a>
      </div>
    </footer>
  );
}
