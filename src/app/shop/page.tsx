type ShopPageProps = {
  searchParams: {
    size?: string;
    color?: string;
    gender?: string;
    category?: string;
    material?: string;
    sort?: string;
    search?: string;
  };
};
import Header from "../../../components/shop/Header";
import { getAllProductsForShop } from "../../../utils/actions";
import Containers from "../../../components/global/Containers";
import Products from "../../../components/shop/Products";
import Filters from "../../../components/shop/Filters";
import NoProducts from "../../../components/shop/NoProducts";

async function Shop({
  searchParams,
}: {
  searchParams: Promise<ShopPageProps["searchParams"]>;
}) {
  const resolvedSearchParams = await searchParams;
  const { sortedProducts, allProductsCount } =
    await getAllProductsForShop(resolvedSearchParams);
  const products = sortedProducts;

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
          <NoProducts reason={allProductsCount === 0 ? "empty" : "filters"} />
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
        />
        <Products products={products} />
      </Containers>
    </div>
  );
}

export default Shop;
