/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/generated/prisma";
import { useState } from "react";
import EditMultipleUploader from "./EditMultipleUploader";
import FormContainer from "../form/FormContainer";
import { editProductImages } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";

function EditMultipleImage({ product }: { product: Product }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentUrls, setCurrentUrls] = useState<string[]>(product.images);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const removeImage = (urlToRemove: string) => {
    setCurrentUrls((prevUrls) => prevUrls.filter((img) => img !== urlToRemove));
  };
  return (
    <FormContainer action={editProductImages}>
      <input type="hidden" name="id" value={product.id} />

      <div className="mt-10">
        <Label className="mb-1">Product Images</Label>
        <p className="text-neutral-500 text-xs mb-2">
          click the x button on the images to delete an image you want deleted
        </p>
        <input
          type="hidden"
          name="editedUrls"
          value={JSON.stringify(currentUrls)}
        />
        <div className="grid sm:grid-cols-6 grid-cols-2 gap-1 gap-y-3 sm:gap-y-1">
          {currentUrls.map((image) => (
            <div
              key={image}
              className="relative w-28 h-28 rounded-lg overflow-hidden shadow-sm border">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(image)}
                className="absolute top-1 right-1 bg-white/70 backdrop-blur-sm 
        text-black w-6 h-6 rounded-full flex items-center justify-center 
        text-xs font-bold hover:bg-white transition hover:cursor-pointer">
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-fit">
          <button
            type="button"
            onClick={() => {
              setCurrentUrls(product.images);
              setImageUploaded(false);
              setShowUpdate(true);
            }}
            className="rounded-sm text-neutral-950  mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500 py-1 px-1 text-xs">
            Reset Images
          </button>
          {!imageUploaded && (
            <Button
              className=" text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
              onClick={() => setShowUpdate(!showUpdate)}
              type="button">
              Add Images
            </Button>
          )}
        </div>
        {showUpdate ? (
          <>
            <Label className={`mt-5 sm:text-sm ${imageUploaded && "hidden"}`}>
              Add product Images.
            </Label>
            <p
              className={`text-xs text-gray-500 mt-2 ${imageUploaded && "hidden"}`}>
              Hold ctrl to select multiple images on pc
            </p>
            <EditMultipleUploader
              product={product}
              setImageUploaded={setImageUploaded}
            />
          </>
        ) : (
          ""
        )}
        <div className="p-3 w-full flex justify-end">
          <SubmitButton text="Update product images" loadingText="Updating" />
        </div>
      </div>
    </FormContainer>
  );
}

export default EditMultipleImage;
