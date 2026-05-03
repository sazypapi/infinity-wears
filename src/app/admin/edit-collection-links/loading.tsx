import Containers from "../../../../components/global/Containers";
import { Skeleton } from "@/components/ui/skeleton";

function EditCollectionLinksLoading() {
  return (
    <Containers className="py-5 px-2">
      <Skeleton className="w-60 h-5 mb-5" />
      <Skeleton className="w-full h-[70vh]" />
    </Containers>
  );
}

export default EditCollectionLinksLoading;
