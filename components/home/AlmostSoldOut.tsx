import { getAlmostSoldOut } from "../../utils/actions";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import { FeaturedProducts } from "./FeaturedProducts";
import Link from "next/link";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";
async function AlmostSoldOut() {
  const almostSoldOut = await getAlmostSoldOut();
  if (almostSoldOut.length === 0) return null;
  return (
    <>
      <h2 className="text-2xl sm:text-4xl text-center text-neutral-700">
        Hurry!
      </h2>
      <h6 className="text-xs sm:text-sm text-center text-neutral-400">
        These pieces are almost sold out!!
      </h6>
      <div className="w-full py-5 gap-15 grid-cols-2 lg:grid-cols-4 justify-items-center items-center text-center hidden sm:grid">
        {almostSoldOut.map((product) => {
          const firstVariant = product.variants[0];
          return (
            <article key={product.id} className="group relative ">
              <Link href={`/products/${product.slug}`}>
                <div className="justify-center w-fit flex flex-col group items-center">
                  {/* /*IMAGE  */}
                  <div className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    <Image
                      src={firstVariant.coverImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      fill
                    />
                    {/* <HoverSwapImage images={hoverImages} alt={product.name} /> */}
                  </div>
                  <div className="w-36 sm:w-60 mt-4">
                    <p className="text-gray-500 text-sm text-center truncate ">
                      {product.name}
                    </p>
                    <p className="text-gray-800 text-xs text-center truncate ">
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
      <div className="flex items-center pt-12 justify-center justify-items-center sm:hidden">
        <FeaturedProducts items={almostSoldOut}>
          {almostSoldOut.map((product) => (
            <FavoriteToggleButton key={product.id} productId={product.id} />
          ))}
        </FeaturedProducts>
      </div>
    </>
  );
}

export default AlmostSoldOut;
