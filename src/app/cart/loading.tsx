import Containers from "../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Containers className="px-2 py-5 flex justify-start lg:hidden flex-col w-full gap-10">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-90 w-full" />
        <Skeleton className="h-60 w-full" />
      </Containers>
    </div>
  );
}

export default loading;
