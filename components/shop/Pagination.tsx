"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Pagination({
  currentPage,
  hasMore,
}: {
  currentPage: number;
  hasMore: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Previous
      </button>
      <span className="text-sm text-neutral-500">Page {currentPage + 1}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore}
        className="px-4 py-2 border-2 border-black text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer">
        Next
      </button>
    </div>
  );
}

export default Pagination;
