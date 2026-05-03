"use client";
import { HomeCarousel } from "@/generated/prisma";
import { useState } from "react";
import FormInput from "../form/FormInput";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "../form/Buttons";

function EditCarouselItem({ image }: { image: HomeCarousel }) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();

  const handleFileSelection = (file: File | null) => {
    if (!file) return;
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const uploaded = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (p) => console.log("progress", p),
      options: { temporary: true },
    });
    setUploadedUrl(uploaded.url);
    setIsUploading(false);
    setFile(null);
    setFilePreview(null);
  };

  return (
    <>
      // {/* <FormContainer action={}> */}
      <div className="w-full flex flex-col justify-start border-b border-neutral-300 pb-4 mb-4 last:border-0 last:mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-3">
          <FormInput
            name="text"
            type="text"
            defaultValue={image.text}
            label="Text"
            required
          />
          <FormInput
            name="link"
            type="text"
            defaultValue={image.link}
            label="Link"
            required
          />
        </div>
        <div className="flex flex-col justify-start mt-2">
          <Label className="mb-2 text-neutral-500 text-xs">Current Image</Label>
          <img
            src={filePreview ?? image.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex flex-col mt-2">
            <Label className="text-black my-2">Replace Image</Label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileSelection(e.target.files?.[0] || null)
                }
                className="border-2 border-gray-300 shadow w-full p-2 rounded-xl"
              />
              <Button
                variant="default"
                onClick={handleUpload}
                disabled={isUploading || !file}
                type="button"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
        {uploadedUrl && (
          <p className="text-xs text-green-600 mt-1">
            Image uploaded successfully
          </p>
        )}
      </div>
      <div className="w-full flex justify-end">
        <SubmitButton />
      </div>
      //
      {/* </FormContainer> */}
    </>
  );
}
export default EditCarouselItem;
