import React from "react";
import { getAlmostSoldOut } from "../../utils/actions";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import { FeaturedProducts } from "./FeaturedProducts";
async function AlmostSoldOut() {
  const almostSoldOut = await getAlmostSoldOut();
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
          return (
            <div
              key={product.id}
              className="justify-center w-fit flex flex-col items-center"
            >
              {/* /*IMAGE  */}
              <div className="w-36 h-48 sm:w-60 sm:h-72 rounded-lg relative overflow-hidden ">
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fill
                />
                {/* <HoverSwapImage images={hoverImages} alt={product.name} /> */}
              </div>
              <div className="w-36 sm:w-60 mt-2">
                <p className="text-gray-500 text-sm text-center truncate ">
                  {product.name}
                </p>
                <p className="text-gray-800 text-xs text-center truncate ">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center pt-12 justify-center justify-items-center sm:hidden">
        <FeaturedProducts items={almostSoldOut} />
      </div>
    </>
  );
}

export default AlmostSoldOut;
