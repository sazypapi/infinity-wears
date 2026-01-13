"use client";

import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";
type SingleImageUploaderProps = {
  onUploaded: (url: string) => void;
};

export default function SingleImageUploader({
  onUploaded,
}: SingleImageUploaderProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

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
    onUploaded(uploaded.url);
  };

  return (
    <div className="py-3 flex flex-col gap-3">
      {uploadedUrl ? (
        <>
          <p className="font-semibold text-green-600">Image uploaded ✔</p>

          {/* IMPORTANT: This sends the image URL to your server action */}
          <input type="hidden" name="coverImage" value={uploadedUrl} />

          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelection(e.target.files?.[0] || null)}
              className="border-2 border-gray-300 shadow w-full p-2 rounded-xl"
            />

            <Button
              variant="default"
              onClick={handleUpload}
              disabled={isUploading || !file}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
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
  );
}
