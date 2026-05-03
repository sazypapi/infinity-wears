import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Containers from "../../../../../components/global/Containers";

function loading() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-60 h-5 mb-5" />
      <Skeleton className="w-[50%] sm:w-[20%] h-20 mt-5" />
      <Skeleton className="w-full h-20 mt-5" />
      <Skeleton className="w-full h-80 mt-5" />
    </Containers>
  );
}

export default loading;
