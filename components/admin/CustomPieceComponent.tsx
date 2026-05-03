"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomPiece } from "@/generated/prisma";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { upsertCustomPieceBg } from "../../utils/actions";

function CustomPieceComponent({
  customPiece,
}: {
  customPiece: CustomPiece | null;
}) {
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

  const [imageUploaded, setImageUploaded] = useState(false);

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    const allImagesUploaded = !!(
      (uploadedUrl || customPiece?.image) &&
      (mobileUploadedUrl || customPiece?.mobileImage)
    );
    setImageUploaded(allImagesUploaded);
  }, [uploadedUrl, mobileUploadedUrl]);

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
    setIsMobileUploading(false);
    setMobileFile(null);
    setMobileFilePreview(null);
  };

  return (
    <>
      <p className="text-left text-xs text-black mb-2">
        Edit Custom Piece Background
      </p>
      <div className="flex gap-3 p-3 flex-col w-full border-2 border-neutral-300 rounded-md">
        <FormContainer action={upsertCustomPieceBg}>
          <input
            type="hidden"
            name="image"
            value={uploadedUrl || customPiece?.image || ""}
          />
          <input
            type="hidden"
            name="mobileImage"
            value={mobileUploadedUrl || customPiece?.mobileImage || ""}
          />

          {/* DESKTOP IMAGE */}
          <div className="py-3 flex flex-col gap-3">
            {customPiece?.image && (
              <>
                <Label className="mb-2 text-neutral-500 text-xs">
                  Current Custom Piece Background
                </Label>
                <img
                  src={uploadedUrl || customPiece.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </>
            )}
            {uploadedUrl && (
              <p className="font-semibold text-green-600">Image uploaded ✔</p>
            )}
            <div className="flex flex-col">
              <Label className="text-black my-2">Custom Piece Background</Label>
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
                  className="bg-transparent text-black border-2 border-black transition duration-500 hover:text-white hover:bg-black"
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
          </div>

          {/* MOBILE IMAGE */}
          <div className="py-3 flex flex-col gap-3">
            {customPiece?.mobileImage && (
              <>
                <Label className="mb-2 text-neutral-500 text-xs">
                  Current Mobile Custom Piece
                </Label>
                <img
                  src={mobileUploadedUrl || customPiece.mobileImage}
                  alt="Mobile Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </>
            )}
            {mobileUploadedUrl && (
              <p className="font-semibold text-green-600">
                Mobile image uploaded ✔
              </p>
            )}
            <div className="flex flex-col">
              <Label className="text-black my-2">
                Mobile Custom Piece Background
              </Label>
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
                  className="bg-transparent text-black border-2 border-black transition duration-500 hover:text-white hover:bg-black"
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
          </div>

          <div className="flex justify-end w-full mt-3">
            {imageUploaded ? (
              <SubmitButton
                text="Update Custom Piece Background"
                loadingText="Updating..."
                className="text-xs bg-transparent px-2 py-1"
              />
            ) : (
              <p className="text-xs text-neutral-600 font-semibold sm:text-sm">
                Upload Images to update Custom Piece Background
              </p>
            )}
          </div>
        </FormContainer>
      </div>
    </>
  );
}

export default CustomPieceComponent;
