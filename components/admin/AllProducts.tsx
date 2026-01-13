import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { getAllProducts } from "../../utils/actions";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import Link from "next/link";
import Containers from "../global/Containers";
import { PiEmptyBold } from "react-icons/pi";
async function AllProducts() {
  const allProducts = await getAllProducts();
  const allProductsLength = allProducts.length;
  if (allProductsLength <= 0) {
    return (
      <Containers className="h-40 sm:mt-14 flex align-middle items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
            <PiEmptyBold /> No products have been added yet
          </h1>
        </div>
      </Containers>
    );
  }
  return (
    <div>
      <Card className="bg-gray-200 p-2">
        <CardContent className="grid gap-6 p-0">
          <div>
            {allProducts.map((product) => {
              return (
                <div
                  className="flex flex-row justify-between align-middle items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3"
                  key={product.id}
                >
                  <div className="sm:w-16 sm:h-16 h-12 w-12 relative">
                    <Image
                      src={product.coverImage}
                      fill
                      className="object-cover shadow-lg rounded-lg border"
                      alt={product.name}
                    />
                  </div>
                  <h2 className="text-gray-800 sm:text-sm text-xs w-40 sm:w-60 text-left">
                    {product.name}
                  </h2>
                  <h2 className="text-gray-800 text-sm hidden sm:inline-block w-30 text-left">
                    {formatCurrency(product.price)}
                  </h2>
                  {product.quantity > 0 ? (
                    <h2 className="text-gray-800 text-sm hidden sm:inline-block text-left w-35">
                      {product.quantity} remaining
                    </h2>
                  ) : (
                    <h2 className="w-30 text-left">None available</h2>
                  )}
                  <Button
                    asChild
                    variant="link"
                    className="text-neutral-950 bg-transparent p-1 sm:border-black sm:border-2 sm:hover:bg-black sm:hover:text-white sm:transition sm:duration-500 underline sm:no-underline underline-offset-3"
                  >
                    <Link
                      className="text-xs"
                      href={`/admin/view-product/${product.slug}`}
                    >
                      View Product
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-center items-center">
          <p className="text-center text-sm text-neutral-600">
            Total Product(s): {allProductsLength}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AllProducts;
