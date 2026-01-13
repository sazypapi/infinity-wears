import React from "react";
import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function CreateProductloading() {
  return (
    <Containers className="py-10 sm:mt-10">
      <div className="flex flex-col justify-start">
        <Skeleton className="w-60 h-5 mb-5" />

        {/* <Skeleton className="h-4 w-35" /> */}
        <Skeleton className="h-8 w-55 mt-3" />
        <Skeleton className="h-160 w-full mt-7" />
      </div>
    </Containers>
  );
}

export default CreateProductloading;
