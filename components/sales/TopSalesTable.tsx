"use client";

import { useState } from "react";
import { formatCurrency } from "../../utils/format";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
type ProductData = {
  name: string;
  unitsSold: number;
  revenue: number;
};

function TopSalesTable({ data }: { data: ProductData[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col justify-center items-center border-2 border-neutral-100 shadow-xs rounded-sm p-1 mt-5 w-full">
      <p className="text-xs text-black mb-3 text-left w-full">
        Top selling products
      </p>

      <input
        type="text"
        placeholder="Filter products..."
        value={search}
        onChange={handleSearch}
        className="w-[90%] border border-neutral-200 rounded-sm px-3 py-1.5 text-xs mb-3 outline-none focus:border-neutral-400"
      />

      <div className="w-[90%] text-xs">
        <div className="grid grid-cols-3 justify-between align-middle ">
          <p className="text-left text-xs font-medium text-neutral-400 pb-2">
            product
          </p>
          <p className="text-left text-xs font-medium text-neutral-400 pb-2">
            units sold
          </p>
          <p className="text-left text-xs font-medium text-neutral-400 pb-2">
            revenue
          </p>
        </div>
        <div className="flex flex-col align-middle items-center ">
          {paginated.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <RxValueNone />
                </EmptyMedia>
                <EmptyTitle className="text-neutral-500 text-sm">
                  No Product Found
                </EmptyTitle>
                <EmptyDescription className="text-neutral-600 text-xs">
                  No product fits your filter
                </EmptyDescription>
                <EmptyContent className="flex-row justify-center gap-2">
                  <button
                    className="text-xs px-2 py-1 rounded-sm bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    Clear Search
                  </button>
                </EmptyContent>
              </EmptyHeader>
            </Empty>
          ) : (
            paginated.map((product) => (
              <div
                key={product.name}
                className="border-b border-neutral-50 last:border-0 grid grid-cols-3 w-full justify-between align-middle"
              >
                <p className="py-2 text-black font-medium text-xs sm:text-sm text-left truncate">
                  {product.name}
                </p>
                <p className="py-2 text-black text-xs sm:text-sm text-left truncate">
                  {product.unitsSold}
                </p>
                <p className="py-2 text-black text-xs sm:text-sm text-left truncate">
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-row w-[90%] items-center justify-between mt-3">
        <p className="text-xs text-neutral-400">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex justify-center items-center align-middle gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="text-xs border border-neutral-200 rounded-sm px-3 py-1 disabled:opacity-40 hover:bg-neutral-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            className="text-xs border border-neutral-200 rounded-sm px-3 py-1 disabled:opacity-40 hover:bg-neutral-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopSalesTable;
