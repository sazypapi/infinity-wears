import React from "react";
import Containers from "../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "../../../components/footer/Footer";

function loading() {
  return (
    <div>
      <Containers className="lg:mt-15 py-5 lg:flex lg:flex-col lg:justify-start hidden">
        <Skeleton className="h-8 w-40 mb-5" />
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="w-full col-span-2">
            <Skeleton className="h-150" />
          </div>
          <div className="w-full col-span-1">
            <Skeleton className="h-80" />
          </div>
        </div>
      </Containers>
      <div className="flex lg:hidden"></div>
      <Footer />
    </div>
  );
}

export default loading;
