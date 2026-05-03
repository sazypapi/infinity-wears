import { getNewReleases } from "../../utils/actions";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import { FeaturedProducts } from "./FeaturedProducts";
import Link from "next/link";
import FavoriteToggleButton from "../shop/FavoriteToggleButton";
async function NewIn() {
  const latestProducts = await getNewReleases();
  function getHoverImages(coverImage: string, images: string[]): string[] {
    if (!images || images.length === 0) {
      return [coverImage];
    }

    // Remove coverImage if it exists in images
    const filtered = images.filter((img) => img !== coverImage);

    // Shuffle
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());

    // Pick up to 2
    const picked = shuffled.slice(0, 2);

    return [coverImage, ...picked];
  }
  if (latestProducts.length === 0) return null;

  return (
    <>
      <h2 className="text-2xl sm:text-4xl text-center text-neutral-700">
        New In
      </h2>
      <h6 className="text-xs sm:text-sm text-center text-neutral-400">
        Explore our latest releases
      </h6>
      <div className="w-full gap-15 grid-cols-2 mt-5 lg:grid-cols-4 justify-items-center items-center text-center hidden sm:grid">
        {latestProducts.map((product) => {
          const firstVariant = product.variants[0];

          return (
            <article className="group relative" key={product.id}>
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
        <FeaturedProducts items={latestProducts}>
          {latestProducts.map((product) => (
            <FavoriteToggleButton key={product.id} productId={product.id} />
          ))}
        </FeaturedProducts>
      </div>
    </>
  );
}

export default NewIn;
