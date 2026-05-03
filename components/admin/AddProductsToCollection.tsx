"use client";
import { Prisma, Product } from "@/generated/prisma";
import { useState } from "react";
import { addToCollection } from "../../utils/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
type products = Prisma.ProductGetPayload<{
  include: {
    variants: true;
  };
}>;
function AddProductsToCollection({
  products,
  id,
}: {
  products: products[];
  id: string;
}) {
  const allProductsLength = products.length;
  if (allProductsLength <= 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No product to add</EmptyTitle>
          <EmptyDescription>
            No product is available to be added
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/admin/create-product">Create Product</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const toggleProduct = (product: Product) => {
    setCurrentProducts((prev) => {
      const products = prev ?? [];

      const exists = products.some((p) => p.id === product.id);

      if (exists) {
        return products.filter((p) => p.id !== product.id);
      }

      return [...products, product];
    });
  };

  return (
    <>
      <FormContainer action={addToCollection}>
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-5 border-2">
          {products.map((product) => {
            const isSelected = currentProducts?.some(
              (p) => p.id === product.id,
            );
            return (
              <div key={product.id} className="justify-start relative w-fit">
                {/* /*IMAGE  */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg relative overflow-hidden shadow-sm border-2">
                  <Image
                    src={product.variants[0].coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                {/* /* REMOVE BUTTON  */}

                <Button
                  type="button"
                  size="icon-sm"
                  onClick={() => toggleProduct(product)}
                  className="absolute right-1 top-1 bg-neutral-300 backdrop-blur-md 
            text-black w-4 h-4 rounded-full flex items-center justify-center 
            text-xs font-bold hover:text-white hover:bg-black transition duration-300 p-1"
                >
                  {isSelected ? "×" : "+"}
                </Button>
                {/* /* PRODUCT NAME  */}

                <div className="w-24 sm:w-28 mt-2">
                  <p className="text-gray-500 text-xs text-left truncate ">
                    {product.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 w-fit">
          <button
            type="button"
            onClick={() => setCurrentProducts([])}
            className="rounded-sm text-neutral-950  mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500 py-1 px-1 text-xs"
          >
            Reset Products
          </button>
          <input
            type="hidden"
            name="collections"
            value={JSON.stringify(currentProducts.map((p) => p.id))}
          />
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            className=" text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
            text="Add to Collection"
            loadingText="Updating Collection"
          />
        </div>
      </FormContainer>
      <div className="w-full flex justify-end mt-5">
        <Button
          variant="link"
          asChild
          className="text-neutral-950 shadow-lg hover:bg-black hover:text-white border-2 border-black transition duration-500 "
        >
          <Link href="/admin/create-product">
            <FaPlusCircle /> Create Product
          </Link>
        </Button>
      </div>
    </>
  );
}

export default AddProductsToCollection;
