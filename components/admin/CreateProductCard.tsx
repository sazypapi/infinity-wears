"use client";
import { useState } from "react";
import { createProduct } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import CreateProductCardDetails from "./CreateProductCardDetails";
import CreateProductImageCard from "./CreateProductImageCard";

function CreateProductCard({
  existingCollections,
}: {
  existingCollections: string[];
}) {
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
  return (
    <div className=" grid-cols-1 gap-5">
      <FormContainer action={createProduct}>
        <div className="">
          <CreateProductCardDetails existingCollections={existingCollections} />
        </div>
        <div className="h-fit my-5">
          <CreateProductImageCard onAllImagesUploaded={setAllImagesUploaded} />
        </div>
        <div className="w-full flex justify-end">
          {allImagesUploaded ? (
            <SubmitButton text="Create Product" />
          ) : (
            <>
              <p className="text-gray-500">To submit form, upload Images </p>
            </>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateProductCard;
