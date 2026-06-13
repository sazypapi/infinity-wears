import { getAllCollectionLinks, getAllProducts } from "../../../utils/actions";
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
import CollectionComponents from "../../../components/collection/CollectionComponents";

async function page() {
  const allCollections = await getAllCollectionLinks();
  const allProducts = await getAllProducts();
  if (allProducts.length === 0) {
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
              <div className="overflow-hidden transition duration-500">
                <div
                  className="relative h-[50vh] w-full bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${collection.image})` }}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <h1 className="text-base sm:text-xl font-bold text-white">
                      {collection.heading}
                    </h1>
                    <h2 className="text-sm  text-center px-4 text-white">
                      {collection.subHeading}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <CollectionComponents
          image="https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/7bd0930d-cd83-4988-9f01-234a14e2eb33.jpg"
          heading="New In"
          subHeading="Discover our newest arrivals and be the first to experience the latest trends."
          link="/collections/new-in"
        />
        <CollectionComponents
          image="https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/e04c3072-f39c-42af-a7b2-0a60c984cfb2.jpg"
          heading="Best Sellers"
          subHeading="Explore our most popular collections, loved by customers worldwide."
          link="/collections/best-selling"
        />
      </div>
    </>
  );
}

export default page;
