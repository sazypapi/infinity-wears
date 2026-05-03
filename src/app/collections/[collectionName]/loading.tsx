import { Skeleton } from "@/components/ui/skeleton";
import Containers from "../../../../components/global/Containers";
import LoadingContainer from "../../../../components/global/LoadingContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

function loading() {
  return (
    <div>
      <Skeleton className="h-20 sm:h-60 w-full rounded-none" />
      <Containers className="py-5">
        <div className="hidden sm:flex justify-between align-middle items-center sm:px-10">
          <div className="flex justify-between align-middle items-center gap-5">
            <Skeleton className="w-20 h-5 rounded-2xl" />
            <Skeleton className="w-20 h-5 rounded-2xl" />
            <Skeleton className="w-20 h-5 rounded-2xl" />
            <Skeleton className="w-20 h-5 rounded-2xl" />
            <Skeleton className="w-20 h-5 rounded-2xl" />
          </div>
          <Skeleton className="w-20 h-5 rounded-2xl" />
          <Skeleton className="w-20 h-5 rounded-2xl" />
        </div>
        <ScrollArea className="sm:hidden w-full">
          <div className="flex align-middle justify-between items-center gap-5 w-full pt-2">
            <Skeleton className="w-18 h-4 rounded-2xl" />
            <Skeleton className="w-18 h-4 rounded-2xl" />
            <Skeleton className="w-18 h-4 rounded-2xl" />
            <Skeleton className="w-18 h-4 rounded-2xl" />
            <Skeleton className="w-18 h-4 rounded-2xl" />
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-10 pb-10">
          <LoadingContainer />
          <LoadingContainer />
        </div>
      </Containers>
    </div>
  );
}

export default loading;
