type SearchPageProps = {
  searchParams: {
    search?: string;
    page?: string;
  };
};
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Containers from "../../../components/global/Containers";
import { getProductsForSearch } from "../../../utils/actions";
import SearchComponent from "../../../components/search/SearchComponent";
import NoProducts from "../../../components/shop/NoProducts";
import Products from "../../../components/search/Products";
import Pagination from "../../../components/shop/Pagination";

async function Search({
  searchParams,
}: {
  searchParams: Promise<SearchPageProps["searchParams"]>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 0;

  const { sortedProducts, allProductsCount, hasMore } =
    await getProductsForSearch(resolvedParams.search ?? "", currentPage);
  if (!sortedProducts.length) {
    return (
      <div>
        <Containers>
          <NoProducts
            where="search"
            reason={allProductsCount === 0 ? "empty" : "filters"}
          />
        </Containers>
      </div>
    );
  }
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Search Products
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchComponent products={sortedProducts} />
      <Products products={sortedProducts} />
      <Pagination currentPage={currentPage} hasMore={hasMore} />
    </Containers>
  );
}

export default Search;
