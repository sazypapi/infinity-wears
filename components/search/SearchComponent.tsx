"use client";
import { Prisma } from "@/generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type productsWithVariants = Prisma.ProductGetPayload<{
  include: {
    variants: true;
  };
}>;
function SearchComponent({ products }: { products: productsWithVariants[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/search?${params.toString()}`);
  }, 500);

  const searchValue = searchParams.get("search");

  useEffect(() => {
    if (!searchValue) {
      setSearch("");
    }
  }, [searchValue]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-xl sm:text-3xl font-semibold text-center mb-2 sm:mb-4">
        Search Results
      </h1>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        type="search"
        placeholder="search products..."
        className="text-[16px] sm:text-xl p-2 text-black w-[80%] sm:w-[50%] h-10 sm:h-12 border-2 border-black rounded-2xl focus:outline-none"
      />
    </div>
  );
}

export default SearchComponent;
