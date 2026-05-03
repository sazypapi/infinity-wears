"use client";

import { useState } from "react";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import CreateCustomPieceMultiImageUploader from "./CreateCustomPieceMultiImageUploader";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { createCreateCustomPiece } from "../../utils/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CreateCustomPieceForm() {
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [value, setValue] = useState("");

  const handleImagesUploaded = (url: string[]) => {
    setImagesUploaded(url.length > 0);
  };
  return (
    <div>
      <FormContainer action={createCreateCustomPiece}>
        <div className="flex gap-3 p-3 flex-col w-full border-2 border-neutral-300 rounded-md mt-5">
          <div className="w-full justify-between grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10 items-center align-middle">
            <div>
              <Label
                htmlFor="garmentType"
                className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
              >
                Garment Type
              </Label>
              <Select
                required
                name="garmentType"
                value={value || ""}
                onValueChange={(value) => setValue(value)}
              >
                <SelectTrigger className="border-2 w-full border-gray-300">
                  <SelectValue
                    placeholder="select a garment type"
                    className="placeholder:text-xs sm:placeholder:text-sm"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="SHIRT">Shirt</SelectItem>
                    <SelectItem value="TROUSER">Trouser</SelectItem>
                    <SelectItem value="DRESS">Dress</SelectItem>
                    <SelectItem value="JACKET">Jacket</SelectItem>
                    <SelectItem value="SWEATSHIRT">Sweatshirt</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <FormInput
              name="phoneNumber"
              type="number"
              label="Phone Number"
              placeholder="08012345678"
              required
            />
          </div>
          <TextArea
            name="description"
            labelText="Description"
            placeholder="enter the description of what you want"
            className="mb-0"
          />

          <CreateCustomPieceMultiImageUploader
            onUploaded={handleImagesUploaded}
          />
          <div className="mt-3 flex justify-end w-full">
            {imagesUploaded ? (
              <SubmitButton text="Submit Idea" loadingText="Submitting" />
            ) : (
              <p className="sm:text-sm text-xs text-black">
                To submit your idea, upload the images{" "}
              </p>
            )}
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateCustomPieceForm;
