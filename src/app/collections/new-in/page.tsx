import { Category, Gender } from "@/generated/prisma";
import { getProductsForNewInPage } from "../../../../utils/actions";
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
async function NewInPage({
  searchParams,
}: {
  searchParams: Promise<ShopPageProps["searchParams"]>;
}) {
  const resolvedSearchParams = await searchParams;
  const products = await getProductsForNewInPage(resolvedSearchParams);
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
      products
        .flatMap((product) =>
          product.variants.flatMap((variant) => variant.sizes),
        )
        .filter((size) => size !== "One Size"),
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
      <Header link="new-in" />
      <Containers className="py-5">
        <Filters
          allColors={allColors}
          allSizes={allSizes}
          allGenders={allGenders}
          allCategories={allCategories}
          allMaterials={allMaterials}
          basePath={`/collections/new-in`}
        />
        <Products products={products} link="new-in" />
      </Containers>
    </div>
  );
}

export default NewInPage;
