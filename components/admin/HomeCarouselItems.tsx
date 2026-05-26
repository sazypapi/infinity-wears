/* eslint-disable @next/next/no-img-element */
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
  mobileImage: string;
  onChange: (
    index: string,
    field: "link" | "text" | "image" | "mobileImage",
    value: any,
  ) => void;
};

function HomeCarouselItems({
  link,
  text,
  image,
  index,
  onChange,
  mobileImage,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [mobileFilePreview, setMobileFilePreview] = useState<string | null>(
    null,
  );
  const [isMobileUploading, setIsMobileUploading] = useState(false);
  const [mobileUploadedUrl, setMobileUploadedUrl] = useState<string | null>(
    null,
  );

  const { edgestore } = useEdgeStore();

  const handleFileSelection = (file: File | null) => {
    if (!file) return;
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleMobileFileSelection = (file: File | null) => {
    if (!file) return;
    setMobileFile(file);
    setMobileFilePreview(URL.createObjectURL(file));
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

  const handleMobileUpload = async () => {
    if (!mobileFile) return;
    setIsMobileUploading(true);
    const uploaded = await edgestore.publicFiles.upload({
      file: mobileFile,
      onProgressChange: (p) => console.log("progress", p),
      options: { temporary: true },
    });
    setMobileUploadedUrl(uploaded.url);
    onChange(index, "mobileImage", uploaded.url);
    setIsMobileUploading(false);
    setMobileFile(null);
    setMobileFilePreview(null);
  };

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-3">
        <div>
          <Label
            htmlFor={`${index}text`}
            className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
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
            className= "shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
            value={text ?? ""}
          />
        </div>
        <div>
          <Label
            htmlFor={`${index}link`}
            className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
          >
            Link &#40;start with &quot;/&quot;&#41;
          </Label>
          <Input
            id={`${index}link`}
            type="text"
            onChange={(e) => onChange(index, "link", e.target.value)}
            name="link"
            placeholder="Link to carousel item"
            required
            className= "shadow-gray-300 shadow-sm/30 border-2 border-gray-300 placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
            value={link ?? ""}
          />
        </div>
      </div>

      {/* DESKTOP IMAGE */}
      <div className="py-3 flex flex-col gap-3">
        {image && (
          <>
            <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">
              Current Carousel Image
            </Label>
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        )}
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
              <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">Carousel Image</Label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileSelection(e.target.files?.[0] || null)
                  }
                  className="border-2 border-gray-300 w-full p-2 text-xs rounded-md text-black"
                />
                <Button
                  variant="default"
                  onClick={handleUpload}
                  disabled={isUploading || !file}
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

      {/* MOBILE IMAGE */}
      <div className="py-3 flex flex-col gap-3">
        {mobileImage && (
          <>
            <Label className="mb-2 text-neutral-500 text-xs">
              Current Mobile Image
            </Label>
            <img
              src={mobileImage}
              alt="Mobile Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        )}
        {mobileUploadedUrl ? (
          <>
            <p className="font-semibold text-green-600">
              Mobile image uploaded ✔
            </p>
            <img
              src={mobileUploadedUrl}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <Label className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm">Mobile Carousel Image</Label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleMobileFileSelection(e.target.files?.[0] || null)
                  }
                  className="border-2 border-gray-300 w-full p-2 text-xs rounded-md text-black"
                />
                <Button
                  variant="default"
                  onClick={handleMobileUpload}
                  disabled={isMobileUploading || !mobileFile}
                >
                  {isMobileUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
            {mobileFilePreview && (
              <img
                src={mobileFilePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomeCarouselItems;
