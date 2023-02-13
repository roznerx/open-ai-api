type BulletPoint = {
  number: number;
  text: string;
};

export default function BulletPoint({ number = 1, text = "" }: BulletPoint) {
  return (
    <div className="mt-10 flex items-center space-x-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black p-4 font-mono text-sm text-white">
        {number}
      </div>
      <p className="text-left font-medium">{text}</p>
    </div>
  );
}
