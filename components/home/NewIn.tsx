import { getNewReleases } from "../../utils/actions";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import { FeaturedProducts } from "./FeaturedProducts";
import Link from "next/link";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";
import HoverSwapImage from "./HoverSwapImage";

async function NewIn() {
  const latestProducts = await getNewReleases();

  if (latestProducts.length === 0) return null;

  return (
    <div className="">
      <div className="w-full grid-cols-2 mt-5 lg:grid-cols-4 md:grid-cols-3 justify-items-center items-center text-center hidden md:grid">
        {latestProducts.map((product, i) => {
          const firstVariant = product.variants[0];
          const secondVariant = product.variants[1];

          return (
            <article
              className={`group relative ${
                i >= 6
                  ? "hidden"
                  : i >= 4
                    ? "hidden md:block lg:hidden"
                    : "block"
              }`}
              key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <div className="justify-center w-fit flex flex-col group items-center">
                  <div className="w-40 h-56 md:w-44 md:h-60 lg:w-52 lg:h-72 rounded-lg  relative overflow-hidden">
                    <HoverSwapImage
                      defaultImage={firstVariant.coverImage}
                      hoverImage={
                        secondVariant?.coverImage ?? firstVariant.coverImage
                      }
                      alt={product.name}
                    />
                  </div>
                  <div className="w-36 lg:w-60 mt-4">
                    <p className="text-gray-500 text-sm text-center truncate">
                      {product.name}
                    </p>
                    <p className="text-gray-800 text-xs text-center truncate">
                      {formatCurrency(firstVariant.price)}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="absolute top-0 left-0 z-20">
                <FavoriteToggleButton productId={product.id} />
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex items-center pt-8 justify-center justify-items-center md:hidden">
        <FeaturedProducts items={latestProducts}>
          {latestProducts.map((product) => (
            <FavoriteToggleButton key={product.id} productId={product.id} />
          ))}
        </FeaturedProducts>
      </div>
    </div>
  );
}

export default NewIn;
