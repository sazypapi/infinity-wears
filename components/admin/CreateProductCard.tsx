"use client";
import { useState } from "react";
import { createProduct } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import CreateProductCardDetails from "./CreateProductCardDetails";
import CreateProductImageCard from "./CreateProductImageCard";
import CreateProductVariant from "./CreateProductVariant";

function CreateProductCard({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
  const [allVariantCoversUploaded, setAllVariantCoversUploaded] =
    useState(false);
  return (
    <div className=" grid-cols-1 gap-5">
      <FormContainer action={createProduct}>
        <div className="">
          <CreateProductCardDetails existingCollections={existingCollections} />
        </div>
        <div className="my-5">
          <CreateProductVariant
            onAllCoverImagesUploaded={setAllVariantCoversUploaded}
          />
        </div>
        <div className="h-fit my-5">
          <CreateProductImageCard onAllImagesUploaded={setAllImagesUploaded} />
        </div>
        <div className="w-full flex justify-end">
          {allImagesUploaded && allVariantCoversUploaded ? (
            <SubmitButton text="Create Product" />
          ) : (
            <>
              <p className="text-gray-500 text-sm">
                To submit form, upload all images and variant cover
                image&#40;s&#41;
              </p>
            </>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateProductCard;
