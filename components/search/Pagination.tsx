"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Pagination({
  currentPage,
  hasMore,
}: {
  currentPage: number;
  hasMore: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const goToPage = (page: number) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Previous
      </button>
      <span className="text-sm text-neutral-500">
        {loading ? "Loading..." : `Page ${currentPage}`}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore || loading}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Next
      </button>
    </div>
  );
}

export default Pagination;
