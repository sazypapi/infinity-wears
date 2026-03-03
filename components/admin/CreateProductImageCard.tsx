"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import MultiImageUploader from "./MultiImageUploader";
import { Label } from "@/components/ui/label";
type Props = { onAllImagesUploaded?: (uploaded: boolean) => void };
function CreateProductImageCard({ onAllImagesUploaded }: Props) {
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const allImagesUploaded = imagesUploaded;
  useEffect(() => {
    if (onAllImagesUploaded) onAllImagesUploaded(allImagesUploaded);
  }, [allImagesUploaded]);
  const handleImagesUploaded = (url: string[]) => {
    setImagesUploaded(url.length > 0);
  };

  return (
    <Card className="w-full bg-white border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="flex justify-center flex-col w-fit font-light text-gray-600">
          <div className="flex ">
            <FaImage />
            &nbsp; Images
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You can only edit these images once selected in the edit page.
            <br />
            It will only be confirmed once the form is submitted.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-black">
        {/* MULTI-IMAGE */}
        <Label>Upload product Images.</Label>
        <p className="text-xs text-gray-500 mt-1">
          Hold ctrl to select multiple images on pc
        </p>
        <MultiImageUploader onUploaded={handleImagesUploaded} />
      </CardContent>
    </Card>
  );
}

export default CreateProductImageCard;
