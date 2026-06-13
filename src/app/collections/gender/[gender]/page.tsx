import { notFound } from "next/navigation";
import Containers from "../../../../../components/global/Containers";
import {
  getProductsForGenderPage,
  parseGender,
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
import Header from "../../../../../components/gender/Header";
import NoProducts from "../../../../../components/gender/NoProducts";
import Filters from "../../../../../components/gender/Filters";
import Products from "../../../../../components/gender/Products";
import Pagination from "../../../../../components/gender/Pagination";

type ShopPageProps = {
  searchParams: {
    size?: string;
    color?: string;
    category?: string;
    material?: string;
    sort?: string;
    search?: string;
    page?: string;
  };
};
async function GenderPage({
  searchParams,
  params,
}: {
  searchParams: Promise<ShopPageProps["searchParams"]>;
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  const genderCheck = await parseGender(gender);
  if (!genderCheck) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>
            The gender <p className="capitalize">{gender}</p> doesn&apos;t exist
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/collections/gender/male">Male</Link>
            </Button>
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/collections/gender/female">Female</Link>
            </Button>
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/collections/gender/unisex">Unisex</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const { products, filteredCount, hasMore } = await getProductsForGenderPage(
    genderCheck!,
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

  const allCategories = Array.from(
    new Set(products.flatMap((product) => product.category)),
  );
  const allMaterials = Array.from(
    new Set(products.flatMap((product) => product.material)),
  );
  if (!products.length) {
    return (
      <div>
        <Header gender={gender} />
        <Containers>
          <NoProducts
            reason={hasActiveFilters && totalProducts > 0 ? "filters" : "empty"}
            gender={gender}
          />
        </Containers>
      </div>
    );
  }
  return (
    <div>
      <Header gender={gender} />
      <Containers className="py-5">
        <Filters
          allColors={allColors}
          allSizes={allSizes}
          allCategories={allCategories}
          allMaterials={allMaterials}
          gender={gender}
          basePath={`/collections/gender/${gender}`}
        />
        <Products products={products} gender={gender} />
        <Pagination
          currentPage={currentPage}
          hasMore={hasMore}
          gender={gender}
        />
      </Containers>
    </div>
  );
}

export default GenderPage;
