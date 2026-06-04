import Containers from "../../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function EditPageloading() {
  return (
    <Containers className="py-5 px-2 ">
      <div className="flex flex-col justify-start">
        <Skeleton className="w-80 h-5 mb-5" />
        <Skeleton className="h-8 w-35 mt-4" />
        <Skeleton className="h-8 w-60 mt-8" />
        <Skeleton className="h-120 w-full mt-4" />
      </div>
    </Containers>
  );
}

export default EditPageloading;
