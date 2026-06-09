import { notFound } from "next/navigation";
import Filters from "../../../../../components/category/Filters";
import Header from "../../../../../components/category/Header";
import NoProducts from "../../../../../components/category/NoProducts";
import Pagination from "../../../../../components/category/Pagination";
import Products from "../../../../../components/category/Products";
import Containers from "../../../../../components/global/Containers";
import { getProductsForCategoryPage } from "../../../../../utils/actions";

type ShopPageProps = {
  searchParams: {
    size?: string;
    color?: string;
    gender?: string;
    category?: string;
    material?: string;
    sort?: string;
    search?: string;
    page?: string;
  };
};
async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams: Promise<ShopPageProps["searchParams"]>;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 0;
  const { products, filteredCount, hasMore } = await getProductsForCategoryPage(
    category,
    resolvedSearchParams,
    currentPage,
  );
  if (!products) notFound();
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
        <Header categoryName={category} />
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
      <Header categoryName={category} />
      <Containers className="py-5">
        <Filters
          allColors={allColors}
          allSizes={allSizes}
          allGenders={allGenders}
          categoryName={category}
          allMaterials={allMaterials}
          basePath={`/collections/category/${category}`}
        />
        <Products products={products} categoryName={category} />
        <Pagination
          currentPage={currentPage}
          hasMore={hasMore}
          categoryName={category}
        />
      </Containers>
    </div>
  );
}

export default CategoryPage;
