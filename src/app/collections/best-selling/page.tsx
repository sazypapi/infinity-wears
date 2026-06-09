import { Category, Gender } from "@/generated/prisma";
import { getProductsForBestSellingPage } from "../../../../utils/actions";
import Containers from "../../../../components/global/Containers";
import Header from "../../../../components/best-selling/Headers";
import Filters from "../../../../components/best-selling/Filters";
import NoProducts from "../../../../components/best-selling/NoProducts";
import Products from "../../../../components/best-selling/Products";

type ShopPageProps = {
  searchParams: {
    size?: string;
    color?: string;
    gender?: Gender;
    category?: Category;
    material?: string;
  };
};
async function BestSellingPage({
  searchParams,
}: {
  searchParams: Promise<ShopPageProps["searchParams"]>;
}) {
  const resolvedSearchParams = await searchParams;
  const products = await getProductsForBestSellingPage(resolvedSearchParams);
  const hasActiveFilters = Object.values(resolvedSearchParams).some(Boolean);
  const totalProducts = products.length;
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
        <Header />
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
      <Header />
      <Containers className="py-5">
        <Filters
          allColors={allColors}
          allSizes={allSizes}
          allGenders={allGenders}
          allCategories={allCategories}
          allMaterials={allMaterials}
          basePath={`/collections/best-selling`}
        />
        <Products products={products} />
      </Containers>
    </div>
  );
}

export default BestSellingPage;
