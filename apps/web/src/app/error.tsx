"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-2 px-4 text-center">
      <h2 className="text-2xl font-semibold">{error.message}</h2>
      <p>{JSON.stringify(error?.cause)}</p>
      <button className="border-2 border-black p-4 hover:bg-gray-300" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
