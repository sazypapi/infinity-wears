import { notFound } from "next/navigation";
import Filters from "../../../../../components/category/Filters";
import Header from "../../../../../components/category/Header";
import NoProducts from "../../../../../components/category/NoProducts";
import Pagination from "../../../../../components/category/Pagination";
import Products from "../../../../../components/category/Products";
import Containers from "../../../../../components/global/Containers";
import {
  getProductsForCategoryPage,
  parseCategory,
} from "../../../../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const categoryCheck = await parseCategory(category);
  if (!categoryCheck) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>This category doesn&apos;t exist</EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/">Go Home</Link>
            </Button>
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/collections/category">Go To All Categories</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const { products, filteredCount, hasMore } = await getProductsForCategoryPage(
    categoryCheck!,
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
