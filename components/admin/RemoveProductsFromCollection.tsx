"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma";
import { useState } from "react";
import { SubmitButton } from "../form/Buttons";
import Image from "next/image";
import FormContainer from "../form/FormContainer";
import { removeFromCollection } from "../../utils/actions";
import Containers from "../global/Containers";
import { PiEmptyBold } from "react-icons/pi";

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
  const allProductsLength = products.length;
  if (allProductsLength <= 0) {
    return (
      <Containers className="h-40 sm:mt-14 flex align-middle items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
            <PiEmptyBold /> No products in this collection
          </h1>
        </div>
      </Containers>
    );
  }

  return (
    <>
      <FormContainer action={removeFromCollection}>
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-5 border-2">
          {currentProducts.map((product) => (
            <div key={product.id} className="justify-start relative w-fit">
              {/* /*IMAGE  */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg relative overflow-hidden shadow-sm border-2">
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
              {/* /* REMOVE BUTTON  */}

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
              {/* /* PRODUCT NAME  */}

              <div className="w-24 sm:w-28 mt-2">
                <p className="text-gray-500 text-xs text-left truncate ">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* /* RESET BUTTON  */}

        <div className="flex flex-col gap-4 w-fit">
          <button
            type="button"
            onClick={() => setCurrentProducts(products)}
            className="rounded-sm text-neutral-950  mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500 py-1 px-1 text-xs"
          >
            Reset Products
          </button>
          <input
            type="hidden"
            name="removedIds"
            value={JSON.stringify(currentProducts.map((p) => p.id))}
          />
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            className=" text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
            text="Remove from Collection"
            loadingText="Updating Collection"
          />
        </div>
      </FormContainer>
    </>
  );
}

export default RemoveProductsFromCollection;
