"use client";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxValueNone } from "react-icons/rx";
function NoProducts({ reason }: { reason: "filters" | "empty" }) {
  const router = useRouter();

  const clearAllFilters = () => {
    router.push(`/collections/best-selling  `);
  };
  return (
    <>
      {/* <div className="h-100 w-full flex flex-col gap-10 justify-center align-middle items-center">
        <h1 className="flex justify-center align-middle gap-3 items-center sm:text-3xl text-xl text-neutral-600">
          <RxValueNone />
          {reason === "filters"
            ? "No products match your filters."
            : "This page has no products yet."}
        </h1>
        <div className="flex align-middle gap-5 items-center justify-between w-[80%] sm:w-[20%]">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go To Shop</Link>
          </Button>
          {reason === "filters" && (
            <Button
              onClick={clearAllFilters}
              className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              Clear Filters
            </Button>
          )}
        </div>
      </div> */}
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>
            {reason === "filters"
              ? "No products match your filters."
              : "This page has no products yet."}
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/shop">Go To Shop</Link>
            </Button>
            {reason === "filters" && (
              <Button
                onClick={clearAllFilters}
                className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Clear Filters
              </Button>
            )}
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}

export default NoProducts;
