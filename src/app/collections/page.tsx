import { getAllCollectionLinks } from "../../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page() {
  const allCollections = await getAllCollectionLinks();
  if (allCollections.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Check back later!</EmptyTitle>
          <EmptyDescription>
            No Collections are available to view currently
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <>
      <h1 className="text-lg  sm:text-2xl font-semibold p-5 text-center">
        All Collections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {allCollections.map((collection) => {
          return (
            <Link
              href={`/collections/${collection.collection.slug}`}
              key={collection.id}>
              <div className="overflow-hidden border-3 border-black hover:border-white transition duration-500">
                <div
                  className="relative h-[50vh] w-full bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${collection.image})` }}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <h1 className="text-base sm:text-2xl text-white">
                      {collection.heading}
                    </h1>
                    <h2 className="text-sm sm:text-xl text-white">
                      {collection.subHeading}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default page;
