import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 p-4">
      <Image src={"/404.svg"} alt="Not Found Error Image" width={1280} height={720} className="max-w-[768px]" />
      <h2 className="text-xl font-extrabold">Oops... Sorry!</h2>
      <p className="text-md text-center">We couldn't find the page you're looking for. Please, try again later.</p>
      <Link href="/" className="rounded-md bg-destructive px-5 py-2 font-bold text-white transition-colors hover:bg-red-500">
        Return Home
      </Link>
    </div>
  );
}
