import React from "react";
import Containers from "../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function AdminloadingPage() {
  return (
    <Containers className="py-4 sm:mt-14">
      <div className="flex justify-end align-middle py-3 px-2 mb-5 ">
        <Skeleton className="w-[40%] sm:w-[12%] h-[5.5vh]" />
      </div>
      <div className="div flex flex-col justify-start">
        <Skeleton className="w-[70%] sm:w-[20%] h-[5vh] mb-10" />
        <Skeleton className="w-full h-[60vh]" />
      </div>
    </Containers>
  );
}

export default AdminloadingPage;
