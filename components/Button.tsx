import LoadingDots from "./LoadingDots";

type ButtonProps = {
  loading: boolean;
  text?: string;
  onCodeGeneration: () => void;
};

export default function Button({
  loading,
  onCodeGeneration,
  text = "Generate Code",
}: ButtonProps) {
  return !loading ? (
    <button
      // bg-gradient-to-r from-pink-500  via-purple-500 to-indigo-500
      className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
      onClick={() => onCodeGeneration()}
    >
      {text}
    </button>
  ) : (
    <button
      className="mt-8 w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
      disabled
    >
      <LoadingDots color="white" style="large" />
    </button>
  );
}
