import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function CustomPieceLoading() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-80 h-5 mb-5" />
      <Skeleton className="w-full h-[90vh]" />
    </Containers>
  );
}

export default CustomPieceLoading;
