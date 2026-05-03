import { Skeleton } from "@/components/ui/skeleton";
import Footer from "../../../../../components/footer/Footer";

function OrderIdLoading() {
  return (
    <>
      <div className="p-1 hidden sm:flex sm:flex-col gap-3 w-full">
        <Skeleton className="w-[30%] h-45" />
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
      </div>
      <div className="p-1 sm:hidden flex flex-col gap-3 w-full">
        <Skeleton className="w-full h-15" />
        <Skeleton className="w-full h-15" />
        <Skeleton className="w-full h-15" />
      </div>
    </>
  );
}

export default OrderIdLoading;
