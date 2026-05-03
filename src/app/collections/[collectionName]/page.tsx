import { Category, Gender } from "@/generated/prisma";
import { getSingleCollectionLinkProducts } from "../../../../utils/actions";
import { notFound } from "next/navigation";
import Containers from "../../../../components/global/Containers";
import Header from "../../../../components/collectionLinkDetails/Header";
import NoProducts from "../../../../components/collectionLinkDetails/NoProducts";
import Filters from "../../../../components/collectionLinkDetails/Filters";
import Products from "../../../../components/shop/Products";

type ShopPageProps = {
  searchParams: {
    size?: string;
    color?: string;
    gender?: Gender;
    category?: Category;
    material?: string;
    sort?: string;
  };
};
async function CollectionName({
  params,
  searchParams,
}: {
  params: Promise<{ collectionName: string }>;
  searchParams: Promise<ShopPageProps["searchParams"]>;
}) {
  const { collectionName } = await params;
  const decodedCollectionName = decodeURIComponent(collectionName);
  const resolvedSearchParams = await searchParams;
  const getCollectionLinksProducts = await getSingleCollectionLinkProducts(
    resolvedSearchParams,
    decodedCollectionName,
  );
  if (!getCollectionLinksProducts) notFound();
  const products = getCollectionLinksProducts.collection.products;
  const hasActiveFilters = Object.values(resolvedSearchParams).some(Boolean);
  const totalProducts = getCollectionLinksProducts.collection._count.products;
  const allColors = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.flatMap((variant) => variant.colorName),
      ),
    ),
  );
  const allSizes = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.flatMap((variant) => variant.sizes),
      ),
    ),
  );
  const allGenders = Array.from(
    new Set(products.flatMap((product) => product.gender)),
  );
  const allCategories = Array.from(
    new Set(products.flatMap((product) => product.category)),
  );
  const allMaterials = Array.from(
    new Set(products.flatMap((product) => product.material)),
  );
  if (!products.length) {
    return (
      <div>
        <Header collectionLink={getCollectionLinksProducts} />
        <Containers>
          <NoProducts
            reason={hasActiveFilters && totalProducts > 0 ? "filters" : "empty"}
          />
        </Containers>
      </div>
    );
  }
  return (
    <div>
      <Header collectionLink={getCollectionLinksProducts} />

      <Containers className="py-5">
        <Filters
          allColors={allColors}
          allSizes={allSizes}
          allGenders={allGenders}
          allCategories={allCategories}
          allMaterials={allMaterials}
        />
        <Products products={products} />
      </Containers>
    </div>
  );
}

export default CollectionName;
