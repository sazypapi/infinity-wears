import { getAlmostSoldOut, getHomeBestSellers } from "../../utils/actions";
import { formatCurrency } from "../../utils/format";
import Link from "next/link";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";
import HoverSwapImage from "./HoverSwapImage";

async function BestSellers() {
  const bestSellers = await getHomeBestSellers();
  if (bestSellers.length === 0) return null;

  return (
    <div className="w-full grid grid-cols-2 mt-5 gap-y-5 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center text-center">
      {bestSellers.map((product, i) => {
        const firstVariant = product.variants[0];
        const secondVariant = product.variants[1];

        return (
          <article
            key={product.id}
            className={`group relative ${
              i >= 9 ? "hidden" : i >= 8 ? "hidden md:block lg:hidden" : "block"
            }`}>
            <Link href={`/collections/best-selling/products/${product.slug}`}>
              <div className="justify-center w-fit flex flex-col group items-center">
                <div className="w-40 h-56 md:w-44 md:h-60 lg:w-52 lg:h-72 rounded-lg relative overflow-hidden">
                  <HoverSwapImage
                    defaultImage={firstVariant.coverImage}
                    hoverImage={secondVariant?.coverImage ?? product.images[0]}
                    alt={product.name}
                  />
                </div>
                <div className="w-40 md:w-44 lg:w-52 mt-4 h-20">
                  <p className="text-gray-500 text-sm text-center truncate">
                    {product.name}
                  </p>
                  {firstVariant.discount ? (
                    <p className="text-black text-base text-center truncate">
                      {formatCurrency(
                        firstVariant.price * (1 - firstVariant.discount / 100),
                      )}
                      <span className="text-red-500 text-xs">
                        -{firstVariant.discount}%
                      </span>
                    </p>
                  ) : (
                    <p className="text-black text-base text-center truncate">
                      {formatCurrency(firstVariant.price)}
                    </p>
                  )}
                  <p className="text-xs text-gray-600">
                    {product.variants.length > 1
                      ? `Available in ${product.variants.length} colors`
                      : ""}
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
  );
}

export default BestSellers;
