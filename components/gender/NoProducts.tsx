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
function NoProducts({
  reason,
  gender,
}: {
  reason: "filters" | "empty";
  gender?: string;
}) {
  const router = useRouter();

  const clearAllFilters = () => {
    router.push(`/collections/gender/${gender}`);
  };
  return (
    <>
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
