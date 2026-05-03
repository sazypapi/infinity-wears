import { getAllCollections } from "../../utils/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import CreateCollectionPopOver from "./CreateCollectionPopOver";
import AllCollectionsClient from "./AllCollectionsClient";

async function AllCollections() {
  const allCollections = await getAllCollections();

  if (allCollections.length <= 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>No collection has been created</EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateCollectionPopOver component="No Product" />
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div>
      <Card className="bg-gray-200 p-2">
        <CardContent className="p-0">
          <AllCollectionsClient collections={allCollections} />
        </CardContent>
        <CardFooter className="w-full flex flex-col justify-center items-center">
          <p className="text-center text-xs sm:text-sm text-neutral-600">
            Total Collection(s): {allCollections.length}
          </p>
          <p className="mt-3 text-center text-xs text-neutral-600">
            To add or remove a product from a collection click view product
          </p>
          <p className="mt-3 text-center text-[10px] text-neutral-500">
            Go to Content tab to create a page for any collection you want
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AllCollections;
