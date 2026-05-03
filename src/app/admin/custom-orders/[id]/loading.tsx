import { Skeleton } from "@/components/ui/skeleton";
import Containers from "../../../../../components/global/Containers";

function AdminCustomOrderDetails() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-[80%] sm:w-[30%] sm:h-7 h-5" />
      <div className="w-full flex justify-end mt-3">
        <Skeleton className="w-30 sm:h-9 h-7" />
      </div>
      <Skeleton className="mt-2 w-[50%] sm:w-[30%] sm:h-30 h-20" />
      <Skeleton className="w-full h-100 mt-2" />
    </Containers>
  );
}

export default AdminCustomOrderDetails;
