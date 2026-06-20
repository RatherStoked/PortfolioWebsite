import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pl-3">
      <div className="text-xs flex pt-8 pr-2 items-center justify-between">
        <div className="pl-3 hover:blur-xs cursor-pointer dark:text-zinc-300">
          <Link href="/">mattstokes.xyz</Link>
        </div>
      </div>
    </div>
  );
}
