"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";
type Props = {
  coverImage: string;
  index: string;
  onChange: (index: string, field: "coverImage", value: any) => void;
};

function EditVariantCoverImageUploader({ coverImage, index, onChange }: Props) {
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
    onChange(index, "coverImage", uploaded.url);
    setIsUploading(false);
    setFile(null);
    setFilePreview(null);
  };
  return (
    <div className="py-3 flex flex-col gap-3">
      {coverImage ? (
        <>
          <Label className="mb-2 text-neutral-500 text-xs">
            Current Cover Image
          </Label>
          <img
            src={coverImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg "
          />
        </>
      ) : (
        ""
      )}
      <p className="text-xs text-gray-500 mt-3">
        You can only edit these images once uploaded in the edit page.
      </p>
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
            <Label className="text-black my-2">Cover Image</Label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileSelection(e.target.files?.[0] || null)
                }
                className="border-2 border-gray-300 shadow w-full p-2 rounded-xl text-[16px] sm:text-sm sm:placeholder:text-sm placeholder:text-[16px]"
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
  );
}

export default EditVariantCoverImageUploader;
