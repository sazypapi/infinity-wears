import { Skeleton } from "@/components/ui/skeleton";
import Containers from "../../../components/global/Containers";
import LoadingContainer from "../../../components/global/LoadingContainer";

function loading() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-60 h-5 mb-5" />
      <div className="w-full flex flex-col items-center justify-center">
        <Skeleton className="mb-2 sm:mb-4 h-10 w-[60%] sm:w-[40%]" />
        <Skeleton className="w-[80%] sm:w-[50%] h-10 sm:h-12" />
      </div>
      <div className="flex flex-col gap-10 pb-10">
        <LoadingContainer />
        <LoadingContainer />
      </div>
    </Containers>
  );
}

export default loading;
