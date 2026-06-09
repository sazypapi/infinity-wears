/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma";
import { useEdgeStore } from "@/lib/edgestore";
import { useRef, useState } from "react";

function EditMultipleUploader({
  product,
  setImageUploaded,
}: {
  product: Product;
  setImageUploaded: (uploaded: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
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
    setImageUploaded(true);
    // Clear UI
    setFiles([]);
    setFilePreviews([]);
    if (inputRef.current) inputRef.current.value = "";

    setIsUploading(false);
  };
  return (
    <div className="py-3 flex flex-col gap-4">
      {/* hidden field for form */}
      <input type="hidden" name="images" value={JSON.stringify(uploadedUrls)} />

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
          <div className="flex items-start gap-3">
            <input
              ref={inputRef}
              type="file"
              //   required
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelection(e.target.files)}
              className="border-2 border-gray-300 shadow p-2 rounded-2xl w-full text-[16px] sm:text-sm sm:placeholder:text-sm placeholder:text-[16px]"
            />

            <Button
              className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          {filePreviews.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Selected Images:</h3>
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

export default EditMultipleUploader;
