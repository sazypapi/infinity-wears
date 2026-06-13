"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

function Pagination({
  currentPage,
  hasMore,
  categoryName,
}: {
  currentPage: number;
  hasMore: boolean;
  categoryName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.push(`/collections/category/${categoryName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Previous
      </button>
      <span className="text-sm text-neutral-500">
        {isPending ? (
          <span className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
          </span>
        ) : (
          `Page ${currentPage}`
        )}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore || isPending}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Next
      </button>
    </div>
  );
}

export default Pagination;
