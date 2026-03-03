import React from "react";
import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <Containers className="hidden lg:flex lg:flex-col py-5 lg:mt-15">
        <div className="flex flex-col justify-start">
          <div className="px-2">
            <Skeleton className="w-80 h-5 mb-5" />
          </div>
          <div className="flex justify-between align-middle gap-5 border-2 bg-neutral-50 shadow-lg rounded-lg px-2 py-10">
            <Skeleton className="h-140 flex flex-2/3 shadow-lg" />
            <Skeleton className="h-90 flex flex-1/3 shadow-lg" />
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full mt-10" />
        </div>
      </Containers>
      <Containers className="p-3 lg:hidden">
        <Skeleton className="w-70 h-5 mb-5" />
        <Skeleton className="w-full h-[80vh] mb-5" />
      </Containers>
    </>
  );
}

export default loading;
