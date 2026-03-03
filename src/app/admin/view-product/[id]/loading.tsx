import Containers from "../../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function ViewProductlayout() {
  return (
    <Containers className="sm:mt-14 py-14 w-full px-2">
      <Skeleton className="w-60 h-5 mb-5" />

      <div className="flex justify-between w-full">
        <Skeleton className="w-[40%] sm:w-40 h-10" />
        <Skeleton className="w-[40%] sm:w-40 h-10" />
      </div>
      <Skeleton className="h-[80vh] w-full mt-7" />
    </Containers>
  );
}

export default ViewProductlayout;
