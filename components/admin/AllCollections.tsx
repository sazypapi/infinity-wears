import { getAllCollections } from "../../utils/actions";
import Containers from "../global/Containers";
import { PiEmptyBold } from "react-icons/pi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditCollectionName from "./EditCollectionName";
import DeleteCollection from "./DeleteCollection";
import CreateCollectionPopOver from "./CreateCollectionPopOver";

async function AllCollections() {
  const allCollections = await getAllCollections();
  if (allCollections.length <= 0) {
    return (
      <Containers className="h-40 sm:mt-14 flex align-middle items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
            <PiEmptyBold /> No collection created
          </h1>
        </div>
      </Containers>
    );
  }
  return (
    <div>
      <Card className="bg-gray-200 p-2">
        <div className="w-full justify-start">
          <CreateCollectionPopOver />
        </div>
        <CardContent className="grid gap-6 p-0">
          <div>
            {allCollections.map((collection) => {
              const collectionLength = collection.products.length > 0;
              return (
                <div
                  className="flex flex-row justify-between align-middle items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3"
                  key={collection.id}
                >
                  <h2 className="text-gray-800 text-sm text-left capitalize w-25 sm:w-30">
                    {collection.name}
                  </h2>
                  <h2 className="text-gray-800 text-sm hidden sm:inline-block w-50 text-left ">
                    {collectionLength
                      ? `${collection.products.length} Product(s)`
                      : "No Product in Collection"}
                  </h2>

                  <Button
                    variant="link"
                    className="text-neutral-950 bg-transparent p-1 sm:border-black sm:border-2 sm:hover:bg-black sm:hover:text-white sm:transition sm:duration-500 underline sm:no-underline underline-offset-3"
                  >
                    <Link
                      className="text-xs"
                      href={`/admin/view-collection-products/${collection.id}`}
                    >
                      View Products
                    </Link>
                  </Button>
                  <div className="flex flex-row sm:gap-3 gap-1 justify-between">
                    <EditCollectionName collection={collection} />
                    <DeleteCollection collection={collection} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col justify-center items-center">
          <p className="text-center text-sm text-neutral-600">
            Total Collection(s): {allCollections.length}
          </p>
          <p className="mt-3 text-center text-xs text-neutral-600">
            To add or remove a product a product from a collection click view
            product
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AllCollections;
