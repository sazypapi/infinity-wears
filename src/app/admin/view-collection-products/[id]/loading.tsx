import React from "react";
import Containers from "../../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function ViewCollectionProductsLoading() {
  return (
    <Containers className="py-10 sm:py-15 sm:mt-14">
      <div className="div flex flex-col justify-start">
        <Skeleton className="w-60 h-5 mb-5" />
        <Skeleton className="w-70 h-10 mb-6" />
        <Skeleton className="w-60 h-8 mb-10" />

        <Skeleton className="w-full h-[60vh]" />
      </div>
    </Containers>
  );
}

export default ViewCollectionProductsLoading;
