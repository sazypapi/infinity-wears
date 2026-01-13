"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/generated/prisma";
import { useState } from "react";
import EditSingleUploader from "./EditSingleUploader";
import FormContainer from "../form/FormContainer";
import { editCoverImage } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";

function EditSingleImage({ product }: { product: Product }) {
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <FormContainer action={editCoverImage}>
      <input type="hidden" name="id" value={product.id} />
      <div>
        <Label className="mb-2">Cover Image</Label>
        <img
          src={product.coverImage}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-lg mt-2"
        />
        <Button
          className="text-neutral-950 mt-5 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
          onClick={() => setShowUpdate(!showUpdate)}
          type="button"
        >
          Update Image
        </Button>
        {showUpdate ? (
          <>
            <EditSingleUploader defaultUrl={product.coverImage} />
            <div className="p-3 w-full flex justify-end">
              <SubmitButton text="Update cover image" loadingText="Updating" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </FormContainer>
  );
}

export default EditSingleImage;
