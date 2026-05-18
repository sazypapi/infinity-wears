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

async function Search({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const { sortedProducts, allProductsCount } =
    await getProductsForSearch(search);
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
              href="/"
            >
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
    </Containers>
  );
}

export default Search;
