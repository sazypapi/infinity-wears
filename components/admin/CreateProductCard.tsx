"use client";
import { useState, useRef } from "react";
import { createProduct } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import CreateProductCardDetails from "./CreateProductCardDetails";
import CreateProductImageCard from "./CreateProductImageCard";
import CreateProductVariant from "./CreateProductVariant";
import { Checkbox } from "@/components/ui/checkbox";
import { SizeCategory } from "../../utils/types";

function CreateProductCard({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
  const [allVariantCoversUploaded, setAllVariantCoversUploaded] =
    useState(false);
  const [sizeCategory, setSizeCategory] = useState<SizeCategory>("clothing");
  const variantRef = useRef<{ resetSizes: (category: SizeCategory) => void }>(
    null,
  );

  const handleCategoryChange = (category: SizeCategory) => {
    setSizeCategory(category);
    variantRef.current?.resetSizes(category);
  };

  return (
    <div className="grid-cols-1 gap-5">
      <FormContainer action={createProduct}>
        <div>
          <CreateProductCardDetails existingCollections={existingCollections} />
        </div>

        <div className="flex items-center gap-6 my-4">
          {(["clothing", "footwear", "accessories"] as SizeCategory[]).map(
            (cat) => (
              <div key={cat} className="flex items-center gap-2">
                <Checkbox
                  id={`size-cat-${cat}`}
                  checked={sizeCategory === cat}
                  className="border-2 border-gray-600"
                  onCheckedChange={() => handleCategoryChange(cat)}
                />
                <label
                  htmlFor={`size-cat-${cat}`}
                  className="text-xs sm:text-sm capitalize text-black cursor-pointer">
                  {cat}
                </label>
              </div>
            ),
          )}
        </div>

        <div className="my-5">
          <CreateProductVariant
            ref={variantRef}
            onAllCoverImagesUploaded={setAllVariantCoversUploaded}
            sizeCategory={sizeCategory}
          />
        </div>
        <div className="h-fit my-5">
          <CreateProductImageCard onAllImagesUploaded={setAllImagesUploaded} />
        </div>
        <div className="w-full flex justify-end">
          {allImagesUploaded && allVariantCoversUploaded ? (
            <SubmitButton text="Create Product" />
          ) : (
            <p className="text-gray-500 text-sm">
              To submit form, upload all images and variant cover
              image&#40;s&#41;
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateProductCard;
