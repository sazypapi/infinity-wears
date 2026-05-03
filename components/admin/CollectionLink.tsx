"use client";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Prisma } from "@/generated/prisma";

import { useEffect, useMemo, useState } from "react";
import { RxValueNone } from "react-icons/rx";
import { toast } from "sonner";
import FormContainer from "../form/FormContainer";
import CollectionLinkItem from "./CollectionLinkItem";
import { createOrUpdateCollectionLinks } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";
import { useFormStatus } from "react-dom";
type collections = Prisma.CollectionGetPayload<{
  include: {
    collectionLinks: true;
  };
}>;
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
type CollectionLink = {
  id: string;
  image: string;
  heading: string;
  subHeading: string;
  collectionName: string;
};
function CollectionLink({
  collections,
  allCollectionLinks,
}: {
  collections: collections[];
  allCollectionLinks: collectionLinks[];
}) {
  const collectionLinksWithCollectionMappedToCollectionLinks =
    allCollectionLinks.map((collection) => ({
      id: collection.id,
      image: collection.image,
      heading: collection.heading,
      subHeading: collection.subHeading,
      collectionName: collection.collectionName,
    }));

  const [collectionLinks, setCollectionLinks] = useState<CollectionLink[]>(
    allCollectionLinks.length === 0
      ? [
          {
            id: "initial",
            collectionName: "",
            heading: "",
            image: "",
            subHeading: "",
          },
        ]
      : collectionLinksWithCollectionMappedToCollectionLinks,
  );
  const ensureAtLeastOne = (list: CollectionLink[]) =>
    list.length > 0
      ? list
      : [
          {
            id: "initial",
            collectionName: "",
            heading: "",
            image: "",
            subHeading: "",
          },
        ];
  const [imageUploaded, setImageUploaded] = useState(false);

  const updateLink = (id: string, field: keyof CollectionLink, value: any) => {
    setCollectionLinks((prev) =>
      prev.map((collection) =>
        collection.id === id ? { ...collection, [field]: value } : collection,
      ),
    );
  };

  const collectionLinksJson = useMemo(
    () => JSON.stringify(collectionLinks),
    [collectionLinks],
  );

  useEffect(() => {
    const allImagesUploaded =
      collectionLinks.length > 0 &&
      collectionLinks.every(
        (collection) => collection.image && collection.image.length > 0,
      );
    setImageUploaded(allImagesUploaded);
  }, [collectionLinks]);
  const removeCollection = (id: string) => {
    if (allCollectionLinks.length === 0 && collectionLinks.length === 1) {
      return toast("There are no collection links to remove.");
    }
    setCollectionLinks((prev) =>
      prev.filter((collection) => collection.id !== id),
    );
  };
  const collectionsAvailableForCreationOfLink = collections.filter(
    (collection) => collection.collectionLinks.length === 0,
  );
  const addCollection = () => {
    if (collectionsAvailableForCreationOfLink.length === 0) {
      return toast(
        "There's no collection available for the creation of a link",
      );
    } else if (collectionLinks.length === collections.length) {
      return toast("You have no more collections to create a link from");
    }
    setCollectionLinks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        collectionName: "",
        heading: "",
        image: "",
        subHeading: "",
      },
    ]);
  };
  const selectedCollectionNames = collectionLinks
    .map((link) => link.collectionName)
    .filter(Boolean);
  const { pending } = useFormStatus();
  if (collectionLinks.length === 0 && allCollectionLinks.length > 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Collection Links</EmptyTitle>
          <EmptyDescription>
            You have removed all collection links
          </EmptyDescription>
          <EmptyContent className="flex-col justify-center gap-2">
            <Button
              className="text-xs bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
              onClick={() =>
                setCollectionLinks(
                  allCollectionLinks.length === 0
                    ? [
                        {
                          id: "initial",
                          collectionName: "",
                          heading: "",
                          image: "",
                          subHeading: "",
                        },
                      ]
                    : collectionLinksWithCollectionMappedToCollectionLinks,
                )
              }
              type="button"
            >
              Reset Links
            </Button>
            <FormContainer action={createOrUpdateCollectionLinks}>
              <input
                type="hidden"
                name="collectionLinks"
                value={collectionLinksJson}
              />
              <SubmitButton
                text="Update Links"
                loadingText="Saving..."
                className="text-xs bg-transparent px-2 py-1"
              />
              {/* <Button
                type="submit"
                disabled={pending}
                className="capitalize text-black hover:bg-black hover:text-white transition-all duration-300 border-2 border-black text-xs bg-transparent px-2 py-1"
              >
                {pending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Links"
                )}
              </Button> */}
            </FormContainer>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div>
      <p className="text-left text-xs text-black mb-2">Edit Collection Links</p>
      <FormContainer action={createOrUpdateCollectionLinks}>
        <input
          type="hidden"
          name="collectionLinks"
          value={collectionLinksJson}
        />
        <div className="flex gap-3 p-3 flex-col w-full border-2 border-neutral-300 rounded-md">
          {collectionLinks.map((link, index) => (
            <div
              className="w-full p-1 border-b-2 border-neutral-500 last:border-none pb-5"
              key={link.id}
            >
              <CollectionLinkItem
                collectionName={link.collectionName}
                collections={collections}
                heading={link.heading}
                image={link.image}
                index={link.id}
                onChange={updateLink}
                subHeading={link.subHeading}
                selectedCollectionNames={selectedCollectionNames}
              />
              <div className="w-full flex justify-end gap-2 mt-2">
                <button
                  onClick={() => removeCollection(link.id)}
                  className="text-red-500 bg-transparent px-2 py-1 text-xs hover:bg-red-500 hover:text-white border-2 border-red-500 transition duration-500 rounded-md"
                  type="button"
                >
                  Remove
                </button>
                {index === collectionLinks.length - 1 && (
                  <button
                    onClick={addCollection}
                    className="text-neutral-950 bg-transparent px-2 py-1 hover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 rounded-md"
                    type="button"
                  >
                    + Add New Link
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full mt-3">
          {imageUploaded ? (
            <SubmitButton
              text="Update Links"
              loadingText="Updating..."
              className="text-xs bg-transparent px-2 py-1"
            />
          ) : (
            <p className="text-xs text-neutral-600 font-semibold sm:text-sm">
              Upload Images to create Links
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default CollectionLink;
