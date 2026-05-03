"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { RxValueNone } from "react-icons/rx";
function NoProducts({ reason }: { reason: "filters" | "empty" }) {
  const router = useRouter();
  const params = useParams();
  const collectionName = params.collectionName as string;
  const decodedCollectionName = decodeURIComponent(collectionName);

  const clearAllFilters = () => {
    router.push(`/collections/${decodedCollectionName}`);
  };
  return (
    <div className="h-100 w-full flex flex-col gap-10 justify-center align-middle items-center">
      <h1 className="flex justify-center align-middle gap-3 items-center sm:text-3xl text-xl text-neutral-600">
        <RxValueNone />
        {reason === "filters"
          ? "No products match your filters."
          : "This collection has no products yet."}
      </h1>
      <div className="flex align-middle gap-5 items-center justify-between w-[80%] sm:w-[20%]">
        <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
          <Link href="/">Go Home</Link>
        </Button>
        {reason === "filters" && (
          <Button
            onClick={clearAllFilters}
            className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

export default NoProducts;
