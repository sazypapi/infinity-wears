"use client";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma";
import { useState } from "react";
import { SubmitButton } from "../form/Buttons";
import Image from "next/image";
import FormContainer from "../form/FormContainer";
import { removeFromCollection } from "../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";

type Product = Prisma.ProductGetPayload<{
  include: {
    variants: true;
  };
}>;

function RemoveProductsFromCollection({
  products,
  id,
}: {
  products: Product[];
  id: string;
}) {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  const removeProducts = (product: Product) => {
    setCurrentProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <FormContainer action={removeFromCollection}>
      <input
        type="hidden"
        name="removedIds"
        value={JSON.stringify(currentProducts.map((p) => p.id))}
      />
      <input type="hidden" name="id" value={id} />

      {currentProducts.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RxValueNone />
            </EmptyMedia>
            <EmptyTitle className="text-neutral-500">
              No product in collection
            </EmptyTitle>
            <EmptyDescription>
              You've removed every product from the collection
            </EmptyDescription>
            <EmptyContent className="flex-row justify-center gap-2">
              <SubmitButton
                className="text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
                text="Update Collection"
                loadingText="Updating Collection..."
              />
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-5  p-3">
            {currentProducts.map((product) => (
              <div key={product.id} className="justify-start relative w-fit">
                {/* Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg relative overflow-hidden shadow-sm border-2">
                  <Image
                    src={product.variants[0].coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  size="icon-sm"
                  onClick={() => removeProducts(product)}
                  className="absolute right-1 top-1 bg-neutral-300 backdrop-blur-md 
                    text-black w-4 h-4 rounded-full flex items-center justify-center 
                    text-xs font-bold hover:text-white hover:bg-black transition duration-300 p-1"
                >
                  ×
                </Button>

                {/* Product Name */}
                <div className="w-24 sm:w-28 mt-2">
                  <p className="text-gray-500 text-xs text-left truncate">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-fit">
            <button
              type="button"
              onClick={() => setCurrentProducts(products)}
              className="rounded-sm text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500 py-1 px-1 text-xs"
            >
              Reset Products
            </button>
            <SubmitButton
              className="text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
              text="Update Collection"
              loadingText="Updating Collection..."
            />
          </div>
        </>
      )}
    </FormContainer>
  );
}

export default RemoveProductsFromCollection;
