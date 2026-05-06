"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxValueNone } from "react-icons/rx";
function NoProducts({
  reason,
  where,
}: {
  reason: "filters" | "empty";
  where: "shop" | "search";
}) {
  const router = useRouter();

  const clearAllFilters = () => {
    router.push("/shop");
  };
  const clearAllSearch = () => {
    router.push("/search");
  };
  return (
    <div className="h-100 w-full flex flex-col gap-10 justify-center align-middle items-center">
      <h1 className="flex justify-center align-middle gap-3 items-center sm:text-3xl text-xl text-neutral-600">
        <RxValueNone />{" "}
        {reason === "filters"
          ? where === "shop"
            ? "No products match your filters."
            : "No products match your search"
          : "We're stocking up, check back soon."}
      </h1>
      <div className="flex align-middle gap-5 items-center justify-between w-[80%] sm:w-[20%]">
        <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
          <Link href="/">Go Home</Link>
        </Button>
        <Button
          onClick={where === "shop" ? clearAllFilters : clearAllSearch}
          className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
        >
          {where === "shop" ? "Clear Filters" : "Clear Search"}
        </Button>
      </div>
    </div>
  );
}

export default NoProducts;
