import { Skeleton } from "@/components/ui/skeleton";
import Containers from "../../../../components/global/Containers";

function loading() {
  return (
    <Containers className="py-5 px-2">
      <div className="flex justify-center">
        <Skeleton className="sm:w-[35%] w-[80%] h-15 sm:h-20" />
      </div>
      <Skeleton className="w-full h-[30vh] mt-5 " />
      <Skeleton className="w-full h-[25vh] sm:h-[30vh]  mt-5 " />
    </Containers>
  );
}

export default loading;
