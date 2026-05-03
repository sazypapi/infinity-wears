import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <Containers className="py-5 px-2">
        <Skeleton className="w-60 h-5 mb-5" />
        <Skeleton className="w-full sm:h-30 h-60 mb-5" />
        <Skeleton className="w-full sm:h-90 h-90 mb-5" />
        <Skeleton className="w-full sm:h-80 h-90 mb-5" />
      </Containers>
    </>
  );
}

export default loading;
