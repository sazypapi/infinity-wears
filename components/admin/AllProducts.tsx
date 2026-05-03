import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { getAllProducts } from "../../utils/actions";
import Link from "next/link";
import AllProductsClient from "./AllProductsClient";
async function AllProducts() {
  const allProducts = await getAllProducts();
  const allProductsLength = allProducts.length;
  if (allProductsLength === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>No product has been created</EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/admin/create-product">Create Product</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div>
      <Card className="bg-gray-200 p-2">
        <CardContent className="flex flex-col w-full p-0">
          <AllProductsClient products={allProducts} />
        </CardContent>
        <CardFooter className="w-full flex justify-center items-center">
          <p className="text-center text-xs sm:text-sm text-neutral-600">
            Total Product(s): {allProductsLength}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AllProducts;
