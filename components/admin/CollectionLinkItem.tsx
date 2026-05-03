"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prisma } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type collections = Prisma.CollectionGetPayload<{
  include: {
    collectionLinks: true;
  };
}>;

type Props = {
  collectionName: string;
  image: string;
  heading: string;
  subHeading: string;
  index: string;
  onChange: (
    index: string,
    field: "image" | "collectionName" | "subHeading" | "heading",
    value: any,
  ) => void;
  collections: collections[];
  selectedCollectionNames: string[];
};

function CollectionLinkItem({
  heading,
  subHeading,
  collectionName,
  image,
  index,
  onChange,
  collections,
  selectedCollectionNames,
}: Props) {
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

  const allCollectionNames = collections
    .filter(
      (collection) =>
        collection.collectionLinks.length === 0 ||
        collection.collectionLinks.some((link) => link.id === index),
    )
    .map((collection) => collection.name)
    .filter(
      (name) =>
        !selectedCollectionNames.includes(name) || name === collectionName,
    );

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-3">
        <div>
          <Label
            htmlFor={`${index}heading`}
            className="capitalize mb-2 text-xs text-black"
          >
            Header on Image
          </Label>
          <Input
            id={`${index}text`}
            type="text"
            onChange={(e) => onChange(index, "heading", e.target.value)}
            name="heading"
            placeholder="2-4 words"
            required
            className="text-black border-2 border-gray-300 text-xs"
            value={heading ?? ""}
          />
        </div>
        <div>
          <Label
            htmlFor={`${index}subHeading`}
            className="capitalize mb-2 text-xs text-black"
          >
            Sub-Heading
          </Label>
          <Input
            id={`${index}subHeading`}
            type="text"
            onChange={(e) => onChange(index, "subHeading", e.target.value)}
            name="subHeading"
            placeholder="2-10 words"
            required
            className="text-black border-2 border-gray-300 text-xs"
            value={subHeading ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <Label className="capitalize mb-2 text-xs text-black">
            Collection Name
          </Label>
          <Select
            required
            name="category"
            value={collectionName || ""}
            onValueChange={(value) => onChange(index, "collectionName", value)}
          >
            <SelectTrigger className="border-2 w-full border-gray-300 text-xs">
              <SelectValue
                placeholder="select a collection"
                className="text-xs"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allCollectionNames.map((name) => (
                  <SelectItem key={name} value={name} className="text-xs">
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-3 flex flex-col gap-3">
        {image ? (
          <>
            <Label className="mb-2 text-neutral-500 text-xs">
              Current Banner Image
            </Label>
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </>
        ) : (
          ""
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
              <Label className="text-black my-2">Banner Image</Label>
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
                  className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition duration-500"
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
  );
}

export default CollectionLinkItem;
