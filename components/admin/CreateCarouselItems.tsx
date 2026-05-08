"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type Props = {
  link: string;
  text: string;
  image: string;
  index: string;
  onChange: (
    index: string,
    field: "link" | "text" | "image",
    value: any,
  ) => void;
};
function CreateCarouselItem({ link, text, image, index, onChange }: Props) {
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
    onChange(index, "image", uploaded.url);
    setIsUploading(false);
    setFile(null);
    setFilePreview(null);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-start ">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-3">
          <div>
            <Label
              htmlFor={`${index}text`}
              className="capitalize mb-1 sm:mb-2 text-[16px] sm:text-sm"
            >
              Text &#40;2-10 Characters&#41;
            </Label>
            <Input
              id={`${index}text`}
              type="text"
              onChange={(e) => onChange(index, "text", e.target.value)}
              name="text"
              placeholder="Text on Carousel Image"
              required
              className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm"
              value={text ?? ""}
            />
          </div>
          <div>
            <Label
              htmlFor={`${index}link`}
              className="capitalize mb-1 sm:mb-2 text-[16px] sm:text-sm"
            >
              Link &#40;start with "/"&#41;
            </Label>
            <Input
              id={`${index}link`}
              type="text"
              onChange={(e) => onChange(index, "link", e.target.value)}
              name="link"
              placeholder="Link to carousel item"
              required
              className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm"
              value={link ?? ""}
            />
          </div>
        </div>
        <div className="py-3 flex flex-col gap-3">
          {uploadedUrl ? (
            <>
              <p className="font-semibold text-green-600">Image uploaded ✔</p>

              <img
                src={uploadedUrl}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <Label className="capitalize mb-1 sm:mb-2 text-[16px] sm:text-sm">
                  Carousel Image
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileSelection(e.target.files?.[0] || null)
                    }
                    className="border-2 border-gray-300 w-full p-2 text-xs rounded-md text-black"
                    required
                  />

                  <Button
                    variant="default"
                    onClick={handleUpload}
                    disabled={isUploading || !file}
                    className="bg-white text-black hover:text-white rounded-md hover:bg-black transition duration-500 border-2 border-black py-1"
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>

              {filePreview && (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mt-2"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default CreateCarouselItem;
