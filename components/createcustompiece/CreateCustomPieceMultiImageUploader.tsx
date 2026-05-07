"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { useRef, useState } from "react";
import { toast } from "sonner";
type MultiImageUploaderProps = {
  onUploaded: (urls: string[]) => void;
};
export default function CreateCustomPieceMultiImageUploader({
  onUploaded,
}: MultiImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    const oversized = fileArray.filter((file) => file.size > 1024 * 1024 * 2);
    if (oversized.length > 0) {
      toast.error("Each image must be less than 2MB");
      return;
    }

    setFiles(fileArray);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };
  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const urls: string[] = [];

    for (const file of files) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) =>
          console.log(`Uploading ${file.name}: ${progress}%`),
        options: { temporary: true },
      });

      urls.push(res.url);
    }

    setUploadedUrls(urls);

    // Clear UI
    setFiles([]);
    setFilePreviews([]);
    if (inputRef.current) inputRef.current.value = "";

    setIsUploading(false);
    onUploaded(urls);
  };

  return (
    <div className="flex flex-col ">
      {/* hidden field for form */}
      <input
        type="hidden"
        name="sampleImages"
        value={JSON.stringify(uploadedUrls)}
      />

      {/* AFTER UPLOAD → show final images */}
      {uploadedUrls.length > 0 && (
        <>
          <p className="font-semibold text-green-600">Images uploaded ✔</p>
          <div className="flex flex-wrap gap-3">
            {uploadedUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        </>
      )}

      {/* BEFORE UPLOAD → show input + preview */}
      {uploadedUrls.length === 0 && (
        <>
          <div>
            <Label className="text-xs sm:text-sm m-0">
              Upload sample images of what you'd like
            </Label>
            <p className="text-[10px] text-neutral-500 hidden sm:inline-block">
              Hold ctrl to select multiple images on pc
            </p>
          </div>
          <div className="flex items-center gap-3 align-middle">
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelection(e.target.files)}
              className="border-2 border-neutral-300 shadow p-2 text-[16xpx] sm:text-sm rounded-md w-full placeholder:text-[16px] sm:placeholder:text-sm placeholder:text-neutral-500"
            />

            <Button
              variant="default"
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className="bg-white text-black hover:text-white hover:bg-black transition duration-500 border-2 border-black"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          {filePreviews.length > 0 && (
            <div>
              <h3 className="font-medium text-xs mt-2 text-neutral-500">
                Selected Images:
              </h3>
              <div className="flex flex-wrap gap-3">
                {filePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
