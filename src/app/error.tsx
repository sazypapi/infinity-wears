"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h2 className="text-2xl font-semibold text-red-500">
        Oops! Something went wrong 😢
      </h2>

      <p className="text-gray-400 mt-2 max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Try again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
