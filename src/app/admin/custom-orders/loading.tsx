import { Skeleton } from "@/components/ui/skeleton";
import Containers from "../../../../components/global/Containers";

function CustomOrdersLoading() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-[50%] sm:w-[20%] h-7" />
      <Skeleton className="w-full mt-5 h-100 rounded-2xl " />
    </Containers>
  );
}

export default CustomOrdersLoading;
